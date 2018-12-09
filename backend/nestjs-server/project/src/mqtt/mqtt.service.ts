import { FirestoreService } from './../firestore/firestore.service';
import { CLOUDMQTTOPTIONS, MQTTURL } from './mqttSettings';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as mqtt from 'mqtt';
import * as moment from 'moment';
import {OneSignal_PushNotification} from "../../../../cloud/functions/src/index";
const MOVEMENT = 'movementDetected';
const SOUND = 'soundLevel';
const LIGHT = 'lightStatus';

@Injectable()
export class MqttService {
  public client;
  public onesignal = new OneSignal_PushNotification();
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

  public publishLightToggle(callerId: string)
  {
    this.client.publish(LIGHT, callerId);
  }

  private handleMessages() {
    this.client.on('message', (topic: string, message: Buffer) => {
      if (topic === SOUND) {

        const soundLevel = message.toString();

        /***** if soundlevel is bigger then 60, send notificication. 60 can be whatever value.  *****/

        if( parseInt(soundLevel,10) > 60 )
        {this.onesignal.sendNotification();}

        /*********************************************************************************************/

        this.firestoreService.addSoundLevelMeasurement({
          timestamp: new Date(),
          soundLevel,
        });
      } else if (topic === LIGHT) {
        const callerUid = message.toString();
        this.firestoreService.toggleLightStatus(callerUid);
      } else if (topic === MOVEMENT) {
        this.firestoreService.addMovementDetection({ timestamp: new Date() });
      }
    });
  }
}
