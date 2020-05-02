import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {Router} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-adslist',
  templateUrl: './adslist.component.html',
  styleUrls: ['./adslist.component.css']
})
export class AdslistComponent implements OnInit {

  ads=[];

  constructor(private userService:UserService,private route:Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.userService.getFreshRequestedAds()
    .subscribe(res=>{
      this.ads=res;
      console.log(this.ads);
      for(let i=0;i<this.ads.length;i++){
        this.ads[i]["show"]=false;
        console.log(this.ads[i].show);
        console.log(this.stringFromArray(this.ads[i].ad.data));
        this.ads[i]['adContent']=(this.stringFromArray(this.ads[i].ad.data));
        console.log(this.ads['adContent']);
      }
      console.log(this.ads);
      this.spinner.hide();
    })
  }
  picked(ad){
    console.log(ad);
    this.route.navigateByUrl("/pickAd");
    console.log(ad.id);
    localStorage.setItem("adId",ad.id);
 
  }

  stringFromArray(data)
  {
    var count = data.length;
    var str = "";
    
    for(var index = 0; index < count; index += 1)
      str += String.fromCharCode(data[index]);
    
    return atob(str);
  }

  showDiv(event){
    console.log(event);
    event.show=!event.show;
    // console.log(ts.myAds);
  }
}

