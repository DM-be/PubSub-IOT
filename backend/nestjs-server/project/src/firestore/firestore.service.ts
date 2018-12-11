import {
  SoundLevelMeasurement,
  MovementDetection,
  LightStatus,
} from './../models';
import { SERVICEACCOUNT } from './serviceAccount';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Firestore } from '@google-cloud/firestore';
import { MqttService } from 'src/mqtt/mqtt.service';
import * as moment from 'moment';

@Injectable()
export class FirestoreService {
  /**
   *  Service connecting to the Firestore admin SDK
   */
  private db: Firestore;
  constructor(
    @Inject(forwardRef(() => MqttService))
    private readonly mqttService: MqttService,
  ) {
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
    const collectionId = this.getCollectionId(soundLevelMeasurement);
    await this.db
      .collection('statistics')
      .doc(collectionId)
      .collection('soundMeasurements')
      .add(soundLevelMeasurement);
  }

  public async addMovementDetection(movementDetection: MovementDetection) {
    const collectionId = this.getCollectionId(movementDetection);
    await this.db
      .collection('statistics')
      .doc(collectionId)
      .collection('movementDetections')
      .add(movementDetection);
  }

  async toggleLightStatus(callerUid: string): Promise<void> {
    const querySnapShot = await this.db
      .collection('statistics')
      .doc('lightStatus')
      .collection('lightStatusUpdates')
      .orderBy('timestamp', 'desc')
      .get();
    const latestStatus = querySnapShot.docs[0].data() as LightStatus;
    const newLightStatus: LightStatus = {
      timestamp: new Date(),
      status: !latestStatus.status,
      callerUid,
    };
    await this.db
      .collection('statistics')
      .doc('lightStatus')
      .collection('lightStatusUpdates')
      .add(newLightStatus);
  }

  async setLightStatus(callerUid: string, status: boolean) {
    const newLightStatus: LightStatus = {
      timestamp: new Date(),
      status,
      callerUid,
    };
    await this.db
      .collection('statistics')
      .doc('lightStatus')
      .collection('lightStatusUpdates')
      .add(newLightStatus);
  }

  private getCollectionId(
    data: SoundLevelMeasurement | MovementDetection,
  ): string {
    const date = data.timestamp;
    const hourFormat = 'hh:mm:ss';
    const dayMonthYearFormat = 'MMM DD, YYYY';
    const currentDay = moment(date).format(dayMonthYearFormat);
    const currentDayMinusOne = moment(date)
      .subtract(1, 'days')
      .format(dayMonthYearFormat);
    const timeInHours = moment(date, hourFormat);
    const pm_18 = moment('18:00:00', hourFormat);
    const pm_24 = moment('23:59:59', hourFormat);
    const am_0 = moment('00:00:00', hourFormat);
    const am_7 = moment('07:00:00', hourFormat);
    if (timeInHours.isBetween(pm_18, pm_24)) {
      return currentDay;
    } else if (timeInHours.isBetween(am_0, am_7)) {
      return currentDayMinusOne;
    } else {
      return currentDay; // currentDayMinusOne but easier for testing for now
    }
  }
}
