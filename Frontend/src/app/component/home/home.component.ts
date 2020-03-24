import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { NewspaperService } from 'src/app/service/newspaper.service';

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
  categories = [];
  newspaper={
    language: null,
    category: null
  };
  newspapers=[];
  newspaperEditions=[];
  constructor(public router: Router, public newspaperService: NewspaperService) { }
  languages = [];
  route(){
      this.router.navigateByUrl("/rate");
      console.log(this.dateOfPublish);
  }



  ngOnInit() {

    this.newspaperService.getLanguage().subscribe(res => {
      this.languages = res["languages"]
    })
  }
  selectCategory(category){
    this.adCategory=category;
    localStorage.setItem("category",this.adCategory);
    console.log(this.adCategory);
    this.newspaper.category = this.adCategory;
    this.newspaper.language = this.adLanguage;
    this.newspaperService.getNewspaper(this.newspaper).subscribe(res=>{
      console.log(res);
      this.newspapers=res["newspaper"];
    });
  }
  selectRegion(region){
    this.adRegion=region;
    localStorage.setItem("edition",this.adRegion);
    console.log(this.adRegion);
  }
  selectAdType(type){
    this.adType=type;
    localStorage.setItem("adType",this.adType);
    console.log(this.adType);
  }
  selectLanguage(language){
    this.adLanguage=language;
    localStorage.setItem("language",this.adLanguage);
    console.log(this.adLanguage);

    this.newspaperService.getCategory().subscribe(res => {
      this.categories = res["adCategory"]

    })

      }
  selectNewspaper(newspaperName){
    this.adNewspaper = newspaperName;
    localStorage.setItem("newspaper",this.adNewspaper);
    console.log(this.adNewspaper);
    this.newspaperService.getNewspaperEdition({newspaper: this.adNewspaper}).subscribe(res=>{
      console.log(res);
      this.newspaperEditions=res["newspaperEdition"];
    })
  }

}
