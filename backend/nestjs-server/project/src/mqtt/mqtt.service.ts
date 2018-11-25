import { FirestoreService } from './../firestore/firestore.service';
import { CLOUDMQTTOPTIONS, MQTTURL } from './mqttSettings';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as mqtt from 'mqtt';
import * as moment from 'moment';
const MOVEMENT = 'movementDetected';
const SOUND = 'soundLevel';
const LIGHT = 'lightStatus';

@Injectable()
export class MqttService {
  public client;

  /**
   * service responsible for communication with cloudmqtt
   */
  constructor(@Inject(forwardRef(() => FirestoreService)) private readonly firestoreService: FirestoreService) {
    this.client = mqtt.connect(
      MQTTURL,
      CLOUDMQTTOPTIONS,
    );
    this.client.on('connect', () => {
      this.subscribeToTopics();
      this.handleMessages();
    });
  }

  subscribeToTopics() {
    this.client.subscribe(SOUND);
    this.client.subscribe(MOVEMENT);
    this.client.subscribe(LIGHT);
  }

  private handleMessages() {
    this.client.on('message', (topic: string, message: Buffer) => {
      if (topic === SOUND) {
        const soundLevel = message.toString();
        this.firestoreService.addSoundLevelMeasurement({timestamp: new Date(), soundLevel});
      }
      else if (topic === LIGHT) {
        const callerUid = 'ARDUINO'; 
        this.firestoreService.toggleLightStatus(callerUid);
      }

    });
  }
}
