import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LightController } from './light/light.controller';
import { FirestoreService } from './firestore/firestore.service';
import { MqttService } from './mqtt/mqtt.service';

@Module({
  imports: [],
  controllers: [AppController, LightController],
  providers: [AppService, MqttService, FirestoreService],
  exports: [AppService, MqttService, FirestoreService],
})
export class AppModule {}
