import { LightStatusDto } from './../models';
import { FirestoreService } from './../firestore/firestore.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { MqttService } from 'src/mqtt/mqtt.service';

@Controller('light')
export class LightController {
  /**
   *
   */
  constructor(private readonly mqttService: MqttService) {}

  @Post()
  toggleStatus(@Body() lightStatusDto: LightStatusDto) {
    this.mqttService.publishLightToggle(lightStatusDto.callerId);
  }
}
