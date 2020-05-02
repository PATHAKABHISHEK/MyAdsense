import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-pick-news',
  templateUrl: './pick-news.component.html',
  styleUrls: ['./pick-news.component.css']
})
export class PickNewsComponent implements OnInit {

  constructor(private userservice: UserService,private router:Router) { }

  adproofFile:any;
  adPublishProof:any;
  userId=localStorage.getItem("userId");
  adId=localStorage.getItem("adId");

  publishDetail={
    userId:this.userId,
    adId:this.adId,
    adPublishProof:null
  }

  ngOnInit() {
  
  }

  adProofUpload(event){
    this.adproofFile=event.target.files[0];
    const filereader =new FileReader();
    filereader.onload = e=>{
      this.publishDetail.adPublishProof=filereader.result;
      this.publishDetail.adPublishProof=btoa(
        this.publishDetail.adPublishProof
      );
    };
    filereader.readAsBinaryString(this.adproofFile);
  }
  uploadAdProof(){
    this.userservice.adPublished(this.publishDetail)
    .subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl("/myPublishedAds");
    })
  }



}
