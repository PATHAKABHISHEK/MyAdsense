import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from "ngx-spinner"; 


@Component({
  selector: 'app-my-published-ads',
  templateUrl: './my-published-ads.component.html',
  styleUrls: ['./my-published-ads.component.css']
})
export class MyPublishedAdsComponent implements OnInit {

  userId=localStorage.getItem("userId");
  publishedAds: any;
  imgUrl: void;
  constructor(private userService:UserService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
   this.getMyPublishedNews();
  }

  getMyPublishedNews(){
    this.spinner.show();
    
      this.userService.getMyPublishedAds(this.userId)
    .subscribe(res=>{
      this.publishedAds=res;
        console.log(res);
        this.spinner.hide();
        for(let i=0;i<this.publishedAds.length;i++){
          this.publishedAds[i]["show"]=false;
          // console.log(this.publishedAds[i].show);
          // console.log(this.stringFromArray(this.publishedAds[i].adPublishedProof.data));
          this.publishedAds[i]["adProof"]="data:image/png;base64,"+(this.stringFromArray(this.publishedAds[i].adPublishedProof.data));
          console.log(this.publishedAds["adProof"]);
        }
        console.log(this.publishedAds);
      }
    )
    
  }

  stringFromArray(data)
  {
    var count = data.length;
    var str = "";
    
    for(var index = 0; index < count; index += 1)
      str += String.fromCharCode(data[index]);
    // console.log(str);
    return (str);
  }

  showDiv(event){
    console.log(event);
    event.show=!event.show;
    // console.log(ts.myAds);
    let text=(event.adProof);
    let name=`Ad_Proof_id${event.id}.png`;
    this.download(name,text);
  }
  
  download(file, text) { 
  
    //creating an invisible element 
    var element = document.createElement('a'); 
    element.setAttribute('href', text); 
    element.setAttribute('download', file); 

    //the above code is equivalent to 
    // <a href="path of file" download="file name"> 

    document.body.appendChild(element); 

    //onClick property 
    element.click(); 

    document.body.removeChild(element); 
} 
}
