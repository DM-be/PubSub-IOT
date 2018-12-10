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

  constructor() {
  }
  
  ngOnInit() {

  }


}
