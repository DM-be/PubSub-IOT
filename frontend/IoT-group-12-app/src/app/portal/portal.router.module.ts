import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PortalPage } from "./portal.page";
import { LoginPage } from "../login/login.page";
import { SignupPage } from "../signup/signup.page";

const routes: Routes = [
  {
    path: "portal",
    component: PortalPage,
    children: [
      {
        path: "",
        redirectTo: "/portal/(login:login)",
        pathMatch: "full"
      },
      {
        path: "login",
        outlet: "login",
        component: LoginPage
      },
      {
        path: "signup",
        outlet: "signup",
        component: SignupPage
      }
    ]
  },
  {
    path: "",
    redirectTo: "/portal/(login:login)",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalPageRoutingModule {}
