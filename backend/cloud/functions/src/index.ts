import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as moment from 'moment';
admin.initializeApp();


exports.soundLevelHigh = functions.firestore.
  document('statistics/{dayMonthYear}/soundMeasurements/{soundMeasurementId}').onCreate(
    async (event, context) => {
      const data = event.data();
      const soundLevel: number = data.soundLevel;
      if(soundLevel > 100)
      {
        await sendNotificationToAllUserDevices();
      }
      const collectionId = context.params.dayMonthYear;
      await calculateAverageSound(collectionId);
      
    }
  )

async function sendNotificationToAllUserDevices(): Promise<void> {
  const payload  = {
    notification: {
      title: 'high sound is detected',
      body: 'unusual high sound detected!',
      icon: 'https://goo.gl/Fz9nrQ'
    }
  }
  const userUid = 'ezCyZo3EZGRPETaRU2MoaUpYpGA3'
  const db = admin.firestore();
  const devicesRef = db.collection('devices').where('userUid', '==', userUid);
  const devices = await devicesRef.get();
  const tokens = [];

  devices.forEach(res => {
    const token = res.data().token;
    tokens.push(token)
  })

  await admin.messaging().sendToDevice(tokens, payload);

 } 
async function calculateAverageSound(collectionId: string) {
  const db = admin.firestore();
  const docRef = await db.collection('statistics').doc(collectionId).get();
  const soundMeasurementsRef = await db.collection('statistics').doc(collectionId).collection('soundMeasurements').get();
  const numberOfSoundMeasurements = soundMeasurementsRef.docs.length;
  let total = 0;
    soundMeasurementsRef.docs.forEach(soundMeasurement => {
      total += soundMeasurement.data().soundLevel;
    })
  if(!docRef.data())
  {
    await db.collection('statistics').doc(collectionId).set({averageSoundLevel: (total/numberOfSoundMeasurements)});
  }
  else {
    await db.collection('statistics').doc(collectionId).update({averageSoundLevel: (total/numberOfSoundMeasurements)});
  }
}

