import { FirestoreService } from './../firestore/firestore.service';
import { CLOUDMQTTOPTIONS, MQTTURL } from './mqttSettings';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as mqtt from 'mqtt';
const MOVEMENT = 'movementDetected';
const SOUND = 'soundLevel';
const LIGHT = 'lightStatus';

interface Message {
  soundLevel?: number;
  callerUid?: string;
  movementDetected?: boolean; // not so meaningfull since we only send true (only on movement)
  status?: boolean;
}

@Injectable()
export class MqttService {
  public client;
  /**
   * service responsible for communication with cloudmqtt
   */
  constructor(
    @Inject(forwardRef(() => FirestoreService))
    private readonly firestoreService: FirestoreService,
  ) {
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

  public publishLightToggle(callerUid: string) {
    const jsonObj = {
      callerUid,
    };
    const stringJson = JSON.stringify(jsonObj);
    const message = new Buffer(stringJson);
    this.client.publish(LIGHT, message);
  }

  private handleMessages() {
    this.client.on('message', async (topic: string, message: Buffer) => {
      const stringMessage = message.toString();
      const messageInJson: Message = JSON.parse(stringMessage);
      if (topic === SOUND) {
        const soundLevel = messageInJson.soundLevel;
        await this.firestoreService.addSoundLevelMeasurement({
          timestamp: new Date(),
          soundLevel,
        });
      } else if (topic === LIGHT) {
        const callerUid = messageInJson.callerUid;
        if (messageInJson.status) {
          await this.firestoreService.setLightStatus(
            callerUid,
            messageInJson.status,
          );
          // arduino needs to publish true or false depending on the status of the light
        } else {
          // use the toggle feature, because this would have been called using the post in the controller
          await this.firestoreService.toggleLightStatus(callerUid);
        }
      } else if (topic === MOVEMENT) {
        console.log('move')
        const movementDetected = messageInJson.movementDetected;
        await this.firestoreService.addMovementDetection({
          timestamp: new Date(),
          movementDetected
        });
      }
    });
  }
}
