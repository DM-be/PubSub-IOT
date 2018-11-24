import { SoundLevelMeasurement } from './../models';
import { SERVICEACCOUNT } from './serviceAccount';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Firestore } from '@google-cloud/firestore';
import { MqttService } from 'src/mqtt/mqtt.service';

@Injectable()
export class FirestoreService {
  /**
   *  Service connecting to the Firestore admin SDK
   */
  private db: Firestore;
  constructor(private mqttService: MqttService) {
    admin.initializeApp({
      credential: admin.credential.cert(SERVICEACCOUNT),
      databaseURL: 'https://iot-group-12.firebaseio.com',
    });
    this.db = admin.firestore();
  }

  public async addSoundLevelMeasurement(soundLevelMeasurement: SoundLevelMeasurement) {
    await this.db.collection('soundMeasurements').add(soundLevel);
    console.log(soundLevel);
  }

  public async movementDetections(movementDetection: MovementDetection) {
    await this.db.collection('soundMeasurements').add(soundLevel);
    console.log(soundLevel);
  }

}
