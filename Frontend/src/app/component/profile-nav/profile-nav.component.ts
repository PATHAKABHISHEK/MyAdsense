import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.css']
})
export class ProfileNavComponent implements OnInit {

  profilePic:any;
  constructor( private router : Router,private location: Location) { }
  userRole:any;
  imgUrl:any;
  ngOnInit() {
    this.userRole=localStorage.getItem("userRole");
    this.profilePic=localStorage.getItem("profilePic");
    this.imgUrl="data:image/png;base64,"+this.profilePic;
  }



}
