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
  logos: any;
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
      // console.log(res);
      console.log(this.newspaperAdRates);
    });
    this.newspaperService.get_all_newspaper_logos()
    .subscribe(res=>{
      // console.log(res);
      this.logos=res;
      for(let i=0;i<this.logos.length;i++){
        for(let j=0;j<this.newspaperAdRates.length;j++){
          if(this.logos[i].newspaperName===this.newspaperAdRates[j].newspaperName){
          this.newspaperAdRates[i]['logo']="data:image/png;base64,"+this.stringFromArray(this.logos[i].newspaperLogo.data);
          console.log(this.newspaperAdRates[i].logo);
      }
    }
    }
    
    });
 
    console.log(this.newspaperAdRates);
    console.log(this.logos);
    // console.log(this.price);
    // console.log(this.newspaper);
  }

  adprice(event,rate){
    // console.log(event);
    console.log(rate);
    localStorage.setItem("newspaper",rate['newspaperName']);
    this.price=rate['adTextPrice'];
    localStorage.setItem("price",rate['adTextPrice']);

  }
  stringFromArray(data)
  {
    var count = data.length;
    var str = "";
    
    for(var index = 0; index < count; index += 1)
      str += String.fromCharCode(data[index]);
    
    return (str);
  }
}
