import { MomentService } from './../services/moment/moment.service';

import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as moment from 'moment';




interface SoundLevelMeasurement {
  timestamp: string | firebase.firestore.Timestamp ; // a string converted from a date (date in the db for orderby) using momentjs
  soundLevel: string;
}


@Component({
  selector: "app-sound",
  templateUrl: "./sound.page.html",
  styleUrls: ["./sound.page.scss"]
})

export class SoundPage implements OnInit {
  public soundLevelMeasurements: SoundLevelMeasurement[];

  constructor(private _firestore: AngularFirestore, private readonly momentService: MomentService) {}

  ngOnInit() {
    this.subscribeToSoundMeasurements();
  }

  private subscribeToSoundMeasurements() {
    const collectionId = this.momentService.getCollectionId();
    this._firestore
      .collection('statistics')
      .doc(collectionId)
      .collection("soundMeasurements", ref => ref.orderBy("timestamp", "desc"))
      .valueChanges()
      .subscribe((soundLevelMeasurements: SoundLevelMeasurement[]) => {
        if (soundLevelMeasurements) {
          this.soundLevelMeasurements = soundLevelMeasurements.map(slm => {
            const timestamp = slm.timestamp as firebase.firestore.Timestamp;
            const ms = timestamp.seconds * 1000;
            const date = new Date(ms);
            return {
              timestamp: moment(date).fromNow(),
              soundLevel: slm.soundLevel
            } as SoundLevelMeasurement;
          });
        }
      });
  }
}
