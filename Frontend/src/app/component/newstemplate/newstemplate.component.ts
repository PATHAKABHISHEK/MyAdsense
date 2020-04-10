import { Component, OnInit } from "@angular/core";
import { PaymentService } from "src/app/service/payment.service";

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
  constructor(private paymentService: PaymentService) {}

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
      token: (token) => {
        console.log("sending");
        this.paymentService
          .pay({
            stripeTokenId: token.id,
            amount: this.price,
          })
          .subscribe((res) => {
            console.log(res);
          });
      },
    });

    handler.open({
      name: "MyAdsense",
      description: "Pay And Publish Ad",
      amount: 2000,
    });
  }
}
