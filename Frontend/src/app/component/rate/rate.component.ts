import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { NewspaperService } from 'src/app/service/newspaper.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
price:any;
newspaperName;
// @Output() public rateData=new EventEmitter();
NewsRate:{};
  constructor( private newspaperService :NewspaperService) { }
  newspaper = {
    language : localStorage.getItem('language'),
    category: localStorage.getItem("category"),
    newspaper:localStorage.getItem("newspaper"),
    edition:localStorage.getItem("edition"),
    adType: localStorage.getItem("adType")
  }
  adType=localStorage.getItem("adType");

  newspaperAdRates = [];

  ngOnInit() {
    this.newspaperService.getAllNewspaperAdRates(this.newspaper).subscribe(res => {
      this.newspaperAdRates = res;
      console.log(res);
    });
    console.log(this.price);
    console.log(this.newspaper);
  }

  adprice(event,rate){
    // console.log(event);
    console.log(rate);
    localStorage.setItem("newspaper",rate['newspaperName']);
    this.price=rate['adTextPrice'];
    localStorage.setItem("price",rate['adTextPrice']);

  }
}
