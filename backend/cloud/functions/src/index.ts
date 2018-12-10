import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as moment from 'moment';
admin.initializeApp();


exports.soundLevelHigh = functions.firestore.
  document('soundMeasurements/{soundMeasurementId}').onCreate(
    async event => {
      const data = event.data();
      const soundLevel = data.soundLevel;

      if(soundLevel === 'high') // todo
      {
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

        return admin.messaging().sendToDevice(tokens, payload);
      }
  
      const timestamp = data.timestamp
      const ms = timestamp.seconds * 1000;
      const date = new Date(ms);
      const momentObj = moment(date);
      const hourFormat = 'hh:mm:ss'
      const currentDay = moment(date, "MMM DD, YYYY");
      const currentDayMinusOne = moment(date).subtract(1, 'days').format("MMM DD, YYYY");
      const timeInHours = moment(date, hourFormat)
      const pm_18 = moment('18:00:00', hourFormat);
      const pm_24 = moment('23:59:59', hourFormat);
      const am_0 = moment('00:00:00', hourFormat);
      const am_7 = moment('07:00:00', hourFormat);

      if(timeInHours.isBetween(pm_18, pm_24))
      {
        calculateAverageSound(data, currentDay.format("MMM DD, YYYY")); 
      }
      else if(timeInHours.isBetween(am_0, am_7))
      {
        // write previous day
      }

      return null;

    }
  )


async function calculateAverageSound(soundLevelMeasurement: any, collectionId: string): Promise<void>
{
  const db = admin.firestore();
  await db.collection('statistics').doc(collectionId).collection('soundMeasurements').add(soundLevelMeasurement);
  const soundMeasurements = await db.collection('statistics').doc(collectionId).collection('soundMeasurements').get();
  let totalSoundLevel: number = 0;
  soundMeasurements.forEach(soundMeasurement => {
    totalSoundLevel += parseInt(soundMeasurement.data().soundLevel);
  });
  const averageSoundLevel = totalSoundLevel/soundMeasurements.docs.length;
  await db.collection('statistics').doc(collectionId).set({averageSoundLevel})

} 