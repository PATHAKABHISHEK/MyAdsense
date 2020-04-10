import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin="";
  constructor(private location: Location) { }

  ngOnInit() {
    this.isLogin=localStorage.getItem("canNavigate");
    this.ngOnInit();
  }
  showUserProfile(){
    if(this.location.path().includes("/home"))
    { return true; } else { return false; }
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  displayNav() {
    var x = document.getElementById("profileNav");

      x.style.display = "block";
      setTimeout(function() {
        x.style.display="none";
    
        }, 5000);
    } 
  }

