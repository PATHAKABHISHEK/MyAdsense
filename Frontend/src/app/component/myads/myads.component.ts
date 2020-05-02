import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.css']
})
export class MyadsComponent implements OnInit {

  userId=localStorage.getItem("userId");
  myAds=[];
  aa=[];
  show=[];
  hide=true;
  constructor(private userservice:UserService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.userservice.requestedADs(this.userId)
    .subscribe(res=>{
      this.myAds=res;
      
      console.log(res);
      console.log(this.myAds[0].ad);
      
      this.spinner.hide();
      for(let i=0;i<this.myAds.length;i++){
        console.log(this.myAds[i].adStatus);
        if(this.myAds[i].adStatus==='ACTIVE'){
          this.myAds[i].adStatus='PROCESSING';
        }
        else{
          this.myAds[i].adStatus='PUBLISHED';
        }
        this.myAds[i]["show"]=false;

        console.log(this.myAds[i].ad.data);

        console.log(this.stringFromArray(this.myAds[i].ad.data));
        this.myAds[i]['adContent']=(this.stringFromArray(this.myAds[i].ad.data));
        console.log(this.myAds['adContent']);

      } 
   
    })
    // if(this.myAds.adStatus)



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
  console.log(event.id);
  console.log(event.show);
  event.show=!event.show;
  // console.log(ts.myAds);
}

  openNews(){
    // this.dialog.open(NewsImgComponent);
  }
}
