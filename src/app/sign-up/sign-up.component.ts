import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";
import { NotificationService } from '../notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  
  users=[
    { firstname: 'admin', secondname: 'admin',email:'admin@gmail.com', password:'12345' },
  ]
  constructor(private router: Router,private notifyService : NotificationService) { }

  ngOnInit(): void {
  }
  
login(){
  this.router.navigateByUrl('login');
}
signup(firstname: any,secondname: any,email: any,password: any,confirmpassword: any,e: any){
  if(password==confirmpassword){
   this.users.push({firstname:firstname,secondname:secondname,email:email,password:password})
   this.router.navigateByUrl('login');
  }
  else{
    console.log('password does not match')
  }
}
}
