import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin=true;
  userRole=localStorage.getItem("userRole");
  constructor(private location: Location, private router:Router) { }
  profilePic=localStorage.getItem("profilePic");
  ngOnInit() {
    // if(this.isLogin===""){
    // this.isLogin=localStorage.getItem("canNavigate");
    // this.ngOnInit();
    // }
    // this.router.navigate(["/"]).then(e=>{
    //   this.ngOnInit();
    // })
    
    if(
      (this.location.path().includes('/home')||
      this.location.path().includes('/adlist')) && 
      this.isLogin===true){  
        // this.userRole=localStorage.getItem("userProfile");
        this.isLogin=false;
    }
    else if(this.location.path().includes('/')){
      this.isLogin=false;
      // localStorage.clear();
    }
  }
  showUserProfile(){
    if(this.location.path().includes('/home')||
    this.location.path().includes('/about')||
    this.location.path().includes('/rate')||
    this.location.path().includes('/newsContent')||
    this.location.path().includes('/userProfile')||
    this.location.path().includes('/myAds')||
    this.location.path().includes('/adlist')||
    this.location.path().includes('/picked')||
    this.location.path().includes('/myPublishedAds')||
    this.location.path().includes('/editProfile')||
    this.location.path().includes('/pickAd')){
      return true;
    }
    else{
      return false;
    }
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  displayNav() {
    var x = document.getElementById("profileNav");

      x.style.display = "block";
      setTimeout(function() {
        x.style.display="none";
    
        }, 4000);
    } 
  }

