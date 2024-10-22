import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userName=localStorage.getItem("userName");
  emailId=localStorage.getItem("emailId");
  mobileNo=localStorage.getItem("mobileNo");
  profilePic: string;
  imgUrl: string;
  constructor() { }

  ngOnInit() {
    this.profilePic=localStorage.getItem("profilePic");
    this.imgUrl="data:image/png;base64,"+this.profilePic;
  }

}
