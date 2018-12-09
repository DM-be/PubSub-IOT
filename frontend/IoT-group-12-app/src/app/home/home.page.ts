import { OnInit } from '@angular/core';
import { FcmService } from './../services/fcm.service';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

  constructor(public fcmService: FcmService, public toastCtrl: ToastController) {
  }
  
  ngOnInit() {
    this.fcmService.getToken();
    this.fcmService.listenToNotifications().pipe(
      tap(async msg => {
        const toast = await this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        await toast.present();
      })
    ).subscribe();
  }


}
