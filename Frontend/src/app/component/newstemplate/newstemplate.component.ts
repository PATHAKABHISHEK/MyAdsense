import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-newstemplate",
  templateUrl: "./newstemplate.component.html",
  styleUrls: ["./newstemplate.component.css"],
})
export class NewstemplateComponent implements OnInit {
  content = "";
  price = 30;
  count;
  clicked = false;
  constructor() {}

  ngOnInit() {}
  WordCount(str) {
    return str.split(" ").length;
  }
  onCalculate() {
    console.log(this.WordCount(this.content));
    this.count = this.WordCount(this.content) * this.price;
    this.clicked = true;
  }

  pay() {
    var handler = (<any>window).StripeCheckout.configure({
      key: "pk_test_gEc03eRh7OBt0TpEUhacPJBz00n1JaNHUi",
      locale: "auto",
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token.id);
      },
    });

    handler.open({
      name: "MyAdsense",
      description: "Pay And Publish Ad",
      amount: 2000,
    });
  }
}
