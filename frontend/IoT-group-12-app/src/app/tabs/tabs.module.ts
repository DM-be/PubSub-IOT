import { LightPageModule } from './../light/light.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { SoundPageModule } from '../sound/sound.module';
import { MovementPageModule } from '../movement/movement.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    SoundPageModule,
    MovementPageModule,
    LightPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
