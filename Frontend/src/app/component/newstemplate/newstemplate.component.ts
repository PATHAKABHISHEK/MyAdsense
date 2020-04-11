import { Component, OnInit } from "@angular/core";
import { PaymentService } from "src/app/service/payment.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-newstemplate",
  templateUrl: "./newstemplate.component.html",
  styleUrls: ["./newstemplate.component.css"],
})
export class NewstemplateComponent implements OnInit {
  content = "";
  price :number;
  count;
  numberOfWord;
  clicked = false;
  constructor(
    private paymentService: PaymentService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.price=Number(localStorage.getItem('price'));
    console.log(this.price);
  }
  WordCount(str) {
    return str.split(" ").length;
  }
  onCalculate() {
    console.log(this.WordCount(this.content));
    this.numberOfWord=this.WordCount(this.content);
    this.count = this.numberOfWord * this.price;
    this.clicked = true;
  }

  pay() {
    var handler = (<any>window).StripeCheckout.configure({
      key: "pk_test_gEc03eRh7OBt0TpEUhacPJBz00n1JaNHUi",
      locale: "auto",
      token: (token) => {
        console.log("sending");
        localStorage.setItem("amount", String(this.price));
        this.paymentService
          .pay({
            stripeTokenId: token.id,
            amount: this.count * 100,
          })
          .subscribe((res) => {
            let ad = {
              userId: localStorage.getItem("userId"),
              newspaperCategory: localStorage.getItem("category"),
              newspaperName: localStorage.getItem("newspaper"),
              newspaperEdition: localStorage.getItem("edition"),
              newspaperLanguage: localStorage.getItem("language"),
              adType: localStorage.getItem("adType"),
              adRate: localStorage.getItem("amount"),
              adPublishDate: localStorage.getItem("dateOfPublish"),
              ad: "",
              adPublishedBy: null,
              adPublishedProof: "",
            };
            this.userService.requestAd(ad).subscribe((res) => {
              console.log(res);
            });
          });
      },
    });

    handler.open({
      name: "MyAdsense",
      description: "Pay And Publish Ad",
      amount: this.count * 100,
      currency: "inr",
    });
  }
}
