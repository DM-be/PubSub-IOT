import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _fireAuth: AngularFireAuth, private _fireStore: AngularFirestore) {
   }

  public async signInWithEmail(
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> {
    try {
      return await this._fireAuth.auth.signInWithEmailAndPassword(
        email,
        password,
      );
    } catch (error) {
      throw error;
    }
  }

  public async registerWithEmail(
    email: string,
    password: string,
    fullName: string,
    companyName: string,
  ): Promise<void> {
    try {
      const newUserCredential = await this._fireAuth.auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      await newUserCredential.user.updateProfile({
        displayName: fullName,
        photoURL: null,
      });
    } catch (error) {
      throw error;
    }
  }







}



