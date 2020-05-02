import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.css']
})
export class ProfileNavComponent implements OnInit {

  constructor( private router : Router,private location: Location) { }
  userRole:any;
  ngOnInit() {
    this.userRole=localStorage.getItem("userRole");
  }

}
