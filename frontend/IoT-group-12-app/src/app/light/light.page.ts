import { AuthService } from "./../services/auth.service";
import { MomentService } from "./../services/moment/moment.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import axios from "axios";
interface LightStatus {
  timestamp: string | firebase.firestore.Timestamp;
  status: boolean;
  callerUid: string;
}

@Component({
  selector: "app-light",
  templateUrl: "./light.page.html",
  styleUrls: ["./light.page.scss"]
})
export class LightPage implements OnInit {
  public lightStatusUpdates: LightStatus[];

  constructor(
    private _firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscribeToLightStatusUpdates();
  }

  private subscribeToLightStatusUpdates() {
    this._firestore
      .collection("statistics")
      .doc("lightStatus")
      .collection("lightStatusUpdates", ref => ref.orderBy("timestamp", "desc"))
      .valueChanges()
      .subscribe((lightStatusUpdates: LightStatus[]) => {
        if (lightStatusUpdates) {
          this.lightStatusUpdates = lightStatusUpdates.map(lt => {
            const timestamp = lt.timestamp as firebase.firestore.Timestamp;
            const ms = timestamp.seconds * 1000;
            const date = new Date(ms);
            return {
              timestamp: moment(date).fromNow(),
              status: lt.status,
              callerUid: lt.callerUid
            } as LightStatus;
          });
        }
      });
  }

  public async toggleLight() {
    try {
      const result = await axios.post("http://localhost:3000/light", {
        callerUid: this.authService.getUserUid()
      });
    } catch (error) {}
  }
}
