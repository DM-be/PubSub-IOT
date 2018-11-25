import { LightStatusDto } from './../models';
import { FirestoreService } from './../firestore/firestore.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('light')
export class LightController {
  /**
   *
   */
  constructor(private readonly firestoreService: FirestoreService) {}

  @Post()
  toggleStatus(@Body() lightStatusDto: LightStatusDto) {
    this.firestoreService.toggleLightStatus(lightStatusDto.callerId);
  }
}
