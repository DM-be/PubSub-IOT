import {
  SoundLevelMeasurement,
  MovementDetection,
  LightStatus,
} from './../models';
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
    admin.firestore().settings({ timestampsInSnapshots: true });
    this.db = admin.firestore();
  }

  public async addSoundLevelMeasurement(
    soundLevelMeasurement: SoundLevelMeasurement,
  ) {
    await this.db.collection('soundMeasurements').add(soundLevelMeasurement);
  }

  public async addMovementDetection(movementDetection: MovementDetection) {
    await this.db.collection('movementDetections').add(movementDetection);
  }

  async toggleLightStatus(callerId: string): Promise<void> {
    const querySnapShot = await this.db
      .collection('lightStatusUpdates')
      .orderBy('timestamp', 'desc')
      .get();
    const latestStatus = querySnapShot.docs[0].data() as LightStatus;
    const newLightStatus: LightStatus = {
      timestamp: new Date(),
      status: !latestStatus.status,
      callerId,
    };
    await this.db.collection('lightStatusUpdates').add(newLightStatus);
  }
}
