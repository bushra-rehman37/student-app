import { Component, OnInit,Input } from '@angular/core';
import {Router} from "@angular/router";
import { NotificationService } from '../notification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
   
  admin = [
    { email: 'admin@admin.com', password: '12345' },
  ]
  constructor(private router: Router, private notifyService: NotificationService) { }

  ngOnInit() {
  }

  login(email: any, password: any, e: { preventDefault: () => void; }) {
    e.preventDefault();
    console.log(email, password)
    if (email == this.admin[0].email && password == this.admin[0].password) {

      this.showToasterSuccess();

    }
    else {
      this.showToasterError();
      console.log('wrong credentials')
    }
  }
  signUp() {
    this.router.navigateByUrl('/sign-up');
  }
  home() {
    this.router.navigateByUrl('home');
  }

  showToasterSuccess() {
    this.notifyService.showSuccess("Logged in successfully", " Student App ")
    this.router.navigateByUrl('home');
  }

  showToasterError() {
    this.notifyService.showError(" Try again, Logging Failed", "Student App")
  }
}
