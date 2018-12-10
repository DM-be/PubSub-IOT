import { tap } from "rxjs/operators";
import { ToastController } from "@ionic/angular";
import { FcmService } from "./../services/fcm.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"]
})
export class TabsPage implements OnInit {
  constructor(
    public fcmService: FcmService,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.listenToNotifications();
  }

  private listenToNotifications() {
    this.fcmService.getToken();
    this.fcmService
      .listenToNotifications()
      .pipe(
        tap(async msg => {
          const toast = await this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          await toast.present();
        })
      )
      .subscribe();
  }
}
