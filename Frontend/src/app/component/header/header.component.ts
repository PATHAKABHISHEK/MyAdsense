import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin="";
  userRole=localStorage.getItem("userRole");
  constructor(private location: Location, private router:Router) { }

  ngOnInit() {
    if(this.isLogin===""){
    this.isLogin=localStorage.getItem("canNavigate");
    this.ngOnInit();
    }
    // this.router.navigate(["/"]).then(e=>{
    //   this.ngOnInit();
    // })
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

