import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-movement',
  templateUrl: './movement.page.html',
  styleUrls: ['./movement.page.scss'],
})
export class MovementPage implements OnInit {

  public movementDetections: SoundLevelMeasurement[];

  constructor(private _firestore: AngularFirestore) {}

  ngOnInit() {
    this.subscribeToSoundMeasurements();
  }

  private subscribeToSoundMeasurements() {
    this._firestore
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
