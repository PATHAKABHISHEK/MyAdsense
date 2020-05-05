import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NewspaperService } from "src/app/service/newspaper.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  start = true;
  currentDate = new Date();
  adType = "";
  adCategory = "";
  adRegion = "";
  adLanguage = "";
  adNewspaper = "";
  dateOfPublish = "";
  categories = [];
  newspaper = {
    language: null,
    category: null,
  };
  newspapers :any;
  newspaperEditions = [];
  logos: any;
  cloneLogo=[];
  constructor(
    public router: Router,
    public newspaperService: NewspaperService,
    public spinner: NgxSpinnerService
  ) {}
  languages = [];
  route() {
    this.router.navigateByUrl("/rate");
    console.log(this.dateOfPublish);
    localStorage.setItem("dateOfPublish", this.dateOfPublish);
  }

  ngOnInit() {
    window.scroll(0,0);
    this.spinner.show();
    this.newspaperService.getLanguage().subscribe((res) => {
      this.languages = res["languages"];
    });

    this.newspaperService.get_all_newspaper_logos()
      .subscribe(res=>{
        console.log(res);
        this.logos=res;
        console.log(this.logos);
      })
    console.log(this.currentDate);
    this.spinner.hide();
  }
  selectCategory(category) {
    this.adCategory = category;
    localStorage.setItem("category", this.adCategory);
    console.log(this.adCategory);

    this.newspaper.category = this.adCategory;
    this.newspaper.language = this.adLanguage;
    this.spinner.show();
    this.newspaperService.getNewspaper(this.newspaper).subscribe((res) => {
      console.log(res);
     
      this.newspapers=res['newspaper'];

      console.log(this.newspapers.length);
      for (let i=0;i<this.newspapers.length;i++){
        if(this.logos[i].newspaperName===this.newspapers[i]){
          this.logos[i]['paperName']=this.newspapers[i];
          this.logos[i]["logo"]="data:image/png;base64,"+this.stringFromArray(this.logos[i].newspaperLogo.data);
        }
      }
      while(this.cloneLogo.length>0){
        this.cloneLogo.pop();
      }
      console.log("pop",this.cloneLogo);
      for(let j=0;j<this.logos.length;j++){
        if(this.logos[j]["paperName"]!==undefined){
          this.cloneLogo.push(this.logos[j]);
        }
      }
      console.log(this.cloneLogo);
      console.log(this.logos);
      this.spinner.hide();

    });
  }
  selectRegion(region) {
    this.adRegion = region;
    localStorage.setItem("edition", this.adRegion);
    console.log(this.adRegion);
  }
  selectAdType(type) {
    this.adType = type;
    localStorage.setItem("adType", this.adType);
    console.log(this.adType);
  }
  selectLanguage(language) {
    this.adLanguage = language;
    localStorage.setItem("language", this.adLanguage);
    console.log(this.adLanguage);
    this.spinner.show();
    this.newspaperService.getCategory().subscribe((res) => {
      this.categories = res["adCategory"];
      this.spinner.hide();
    });
  }
  selectNewspaper(newspaperName) {
    this.adNewspaper = newspaperName;
    localStorage.setItem("newspaper", this.adNewspaper);
    console.log(this.adNewspaper);
    this.spinner.show();
    
    this.newspaperService
      .getNewspaperEdition({ newspaper: this.adNewspaper })
      .subscribe((res) => {
        console.log(res);
        this.newspaperEditions = res["newspaperEdition"];
        this.spinner.hide();
      });

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
