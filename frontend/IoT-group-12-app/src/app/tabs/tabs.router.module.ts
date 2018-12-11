import { LightPage } from "./../light/light.page";
import { MovementPage } from "./../movement/movement.page";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { SoundPage } from "../sound/sound.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "",
        redirectTo: "/tabs/(sound:sound)",
        pathMatch: "full"
      },
      {
        path: "sound",
        outlet: "sound",
        component: SoundPage
      },
      {
        path: "movement",
        outlet: "movement",
        component: MovementPage
      },
      {
        path: "light",
        outlet: "light",
        component: LightPage
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/(sound:sound)",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
