import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-published-ads',
  templateUrl: './my-published-ads.component.html',
  styleUrls: ['./my-published-ads.component.css']
})
export class MyPublishedAdsComponent implements OnInit {

  userId=localStorage.getItem("userId");
  publishedAds: any;
  constructor(private userService:UserService) { }

  ngOnInit() {
   this.getMyPublishedNews();
  }

  getMyPublishedNews(){
    this.userService.getMyPublishedAds(this.userId)
    .subscribe(res=>{
      this.publishedAds=res;
        console.log(res);
      }
    )
  }
}
