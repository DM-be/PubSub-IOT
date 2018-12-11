import { MomentService } from './../services/moment/moment.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


interface MovementDetection {
  timestamp: string | firebase.firestore.Timestamp;
  movementDetected: boolean;
}

@Component({
  selector: 'app-movement',
  templateUrl: './movement.page.html',
  styleUrls: ['./movement.page.scss'],
})
export class MovementPage implements OnInit {
  public movementDetections: MovementDetection[];

  constructor(private _firestore: AngularFirestore, private readonly momentService: MomentService) {}

  ngOnInit() {
    this.subscribeToMovementDetections();
  }

  private subscribeToMovementDetections() {
    const collectionId = this.momentService.getCollectionId();
    this._firestore
      .collection('statistics')
      .doc(collectionId)
      .collection("movementDetections", ref => ref.orderBy("timestamp", "desc"))
      .valueChanges()
      .subscribe((movementDetections: MovementDetection[]) => {
        if (movementDetections) {
          this.movementDetections = movementDetections.map(md => {
            const timestamp = md.timestamp as firebase.firestore.Timestamp;
            const ms = timestamp.seconds * 1000;
            const date = new Date(ms);
            return {
              timestamp: moment(date).fromNow(),
              movementDetected: md.movementDetected
            } as MovementDetection;
          });
        }
      });
  }

 
}
