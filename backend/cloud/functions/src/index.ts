import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
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

      return null;

    }
  )