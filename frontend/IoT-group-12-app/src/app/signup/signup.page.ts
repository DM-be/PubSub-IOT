import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public name: string;
  public email: string;
  public password: string;
  constructor(private router: Router, private authService: AuthService) {

   }

  ngOnInit() {
  }

  async signUp() {
    try {
      await this.authService.registerWithEmail(this.email, this.password, this.name);
      this.router.navigateByUrl("/portal/(login:login)");
    } catch (error) {
    }
    
  }

}
