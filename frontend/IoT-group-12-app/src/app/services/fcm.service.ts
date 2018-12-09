import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

import { Firebase } from '@ionic-native/firebase/ngx';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(public firebaseNative: Firebase, public _firestore: AngularFirestore, private authService: AuthService) {
   }

   async getToken() {
     const token = await this.firebaseNative.getToken();
     await this.saveTokenToFirestore(token);
   }

   private async saveTokenToFirestore(token: string): Promise<void>{
     const userUid = this.authService.getUserUid();
     const devicesRef = this._firestore.collection('devices');
     const docData = {
        token,
        userUid
     };
     await devicesRef.doc(token).set(docData);
   }

   listenToNotifications(): Observable<any> {
    return this.firebaseNative.onNotificationOpen();
   }

}
