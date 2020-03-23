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
  constructor(public router: Router) { }

  route(){
    if(this.adCategory==="Matrimonial"){
      this.router.navigateByUrl("/rate");
    }
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
}
