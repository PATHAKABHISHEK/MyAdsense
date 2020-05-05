import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent implements OnInit {
  id = localStorage.getItem("userId");
  accountVerificationCode;
  emailId=localStorage.getItem("emailId");
  constructor(public userService:UserService,private router:Router) { }

  ngOnInit() {
  
  }
  verify(){
    this.userService.verifyAccount(this.id, this.accountVerificationCode).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl("/");
    })
  }

  resendOTP(){
    this.userService.resendAccountVerificationCode(this.id)
    .subscribe(res=>{
      console.log(res);
    })
  }

}
