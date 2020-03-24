import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  adType="";
  adCategory="";
  adRegion="";
  adLanguage="";
  adNewspaper="";
  dateOfPublish="";
  constructor(public router: Router) { }

  route(){
      this.router.navigateByUrl("/rate");
      console.log(this.dateOfPublish);
  }



  ngOnInit() {
  }
  selectType(a){
    this.adCategory=a;
    console.log(this.adCategory);
  }
  selectRegion(a){
    this.adRegion=a;
    console.log(this.adRegion);
  }
  selectAdType(a){
    this.adType=a;
    console.log(this.adType);
  }
  selectLanguage(a){
    this.adLanguage=a;
    console.log(this.adLanguage);
      }
  selectNewspaper(a){
    this.adNewspaper=a;
    console.log(this.adNewspaper);
  }

}
