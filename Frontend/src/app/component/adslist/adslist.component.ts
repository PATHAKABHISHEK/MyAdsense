import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-adslist',
  templateUrl: './adslist.component.html',
  styleUrls: ['./adslist.component.css']
})
export class AdslistComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
  }

}
