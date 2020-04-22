import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.css']
})
export class MyadsComponent implements OnInit {

  userId=localStorage.getItem("userId");
  myAds=[];
  
  constructor(private userservice:UserService) { }

  ngOnInit() {
    this.userservice.requestedADs(this.userId)
    .subscribe(res=>{
      this.myAds=res;
      console.log(res);
    })
  }

}
