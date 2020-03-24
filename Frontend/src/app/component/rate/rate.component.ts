import { Component, OnInit } from '@angular/core';
import { NewspaperService } from 'src/app/service/newspaper.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

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
  }

}
