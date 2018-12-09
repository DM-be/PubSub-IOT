import { SignupPageModule } from './../signup/signup.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PortalPage } from './portal.page';
import { PortalPageRoutingModule } from './portal.router.module';
import { LoginPageModule } from '../login/login.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortalPageRoutingModule,
    LoginPageModule,
    SignupPageModule
  ],
  declarations: [PortalPage]
})
export class PortalPageModule {}
