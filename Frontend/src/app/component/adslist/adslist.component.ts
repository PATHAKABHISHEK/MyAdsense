import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-adslist',
  templateUrl: './adslist.component.html',
  styleUrls: ['./adslist.component.css']
})
export class AdslistComponent implements OnInit {

  ads=[];

  constructor(private userService:UserService,private route:Router) { }

  ngOnInit() {
    this.userService.getFreshRequestedAds()
    .subscribe(res=>{
      this.ads=res;
      console.log(this.ads);
    })
  }
  picked(ad){
    console.log(ad);
    this.route.navigateByUrl("/pickAd");
    console.log(ad.id);
    localStorage.setItem("adId",ad.id);
 
  }
}

