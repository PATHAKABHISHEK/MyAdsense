import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newstemplate',
  templateUrl: './newstemplate.component.html',
  styleUrls: ['./newstemplate.component.css']
})
export class NewstemplateComponent implements OnInit {

  content="";
  price=30;
  count;
  clicked=false;
  constructor() { }

  ngOnInit() {
  }
  WordCount(str) { 
    return str.split(" ").length;
  }
  onCalculate(){
    console.log(this.WordCount(this.content));
    this.count=this.WordCount(this.content)*this.price;
    this.clicked=true;
  }
 

}
