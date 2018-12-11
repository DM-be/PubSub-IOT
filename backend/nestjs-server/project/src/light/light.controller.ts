import { LightStatusDto } from './../models';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { MqttService } from 'src/mqtt/mqtt.service';

@Controller('light')
export class LightController {
  /**
   * controller for the light
   * responds to a post to toggle the light status
   * avoids the need for a mqtt installment in the front end app
   */
  constructor(private readonly mqttService: MqttService) {}

  @Post()
  toggleStatus(@Body() lightStatusDto: LightStatusDto) {
    this.mqttService.publishLightToggle(lightStatusDto.callerUid);
  }
}
