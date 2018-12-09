import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  async login() {
    try {
      await this.authService.signInWithEmail(this.email, this.password);
      this.router.navigateByUrl("/app/tabs/(home:home)");
    } catch (err) {}

   
  }
}
