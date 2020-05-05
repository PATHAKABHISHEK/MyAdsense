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
  download(file, text) { 
  
    //creating an invisible element 
    var element = document.createElement('a'); 
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' 
                         + encodeURIComponent(text)); 
    element.setAttribute('download', file); 

    //the above code is equivalent to 
    // <a href="path of file" download="file name"> 

    document.body.appendChild(element); 

    //onClick property 
    element.click(); 

    document.body.removeChild(element); 
} 

downloadAd(event){
  console.log(event);
  let text=(event.adContent);
  let name=`Ad_Id${event.id}.txt`;
  this.download(name,text);
}

}

