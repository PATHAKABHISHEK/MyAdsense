import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  login=localStorage.getItem("canNavigate");
  ngOnInit() {
    // if(this.isLogin===""){
    // this.isLogin=localStorage.getItem("canNavigate");
    // this.ngOnInit();
    // }
    // this.router.navigate(["/"]).then(e=>{
    //   this.ngOnInit();
    // })
    
  this.login=localStorage.getItem("canNavigate");
  console.log(this.login);
  console.log(this.userRole);
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
    this.location.path().includes("/contactUs")||
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
  homeNav(){
    if(this.userRole==="SUBSCRIBER"){
      this.router.navigateByUrl("/home");
    }
    else if(this.userRole==="PUBLISHER"){
      this.router.navigateByUrl("/adlist")
    }
    else{
      this.router.navigateByUrl("/")
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


    myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
  }

