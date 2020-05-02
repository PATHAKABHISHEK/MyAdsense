import { Component, OnInit } from "@angular/core";
import { PaymentService } from "src/app/service/payment.service";
import { UserService } from "src/app/service/user.service";
import swal from "sweetalert";
import {Router} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import html2canvas from 'html2canvas';

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
  newsElement;
  newsBlob;
  clicked = false;
  adtype: string;
  constructor(
    private paymentService: PaymentService,
    private userService: UserService,
    private router:Router,
    private spinner : NgxSpinnerService
  ) {}

  ngOnInit() {
    this.price=Number(localStorage.getItem('price'));
    console.log(this.price);
    this.adtype=localStorage.getItem("adType");
  }
  WordCount(str) {
    return str.split(" ").length;
  }
  onCalculate() {
    console.log(this.WordCount(this.content));
    this.numberOfWord=this.WordCount(this.content);
    this.count = this.numberOfWord * this.price;
    this.clicked = true;
    const a=btoa(this.content);
    console.log(btoa(this.content));
    console.log(atob(a));
    
  }

  pay() {
    var handler = (<any>window).StripeCheckout.configure({
      key: "pk_test_gEc03eRh7OBt0TpEUhacPJBz00n1JaNHUi",
      locale: "auto",
      token: (token) => {
        this.spinner.show();
        console.log("sending");
        localStorage.setItem("amount", String(this.price));
        this.paymentService
          .pay({
            stripeTokenId: token.id,
            amount: this.count * 100
          })
          .subscribe((res) => {
            let ad = {
              userId: localStorage.getItem("userId"),
              newspaperCategory: localStorage.getItem("category"),
              newspaperName: localStorage.getItem("newspaper"),
              newspaperEdition: localStorage.getItem("edition"),
              newspaperLanguage: localStorage.getItem("language"),
              adType: localStorage.getItem("adType"),
              adRate: parseFloat(this.count),
              adPublishDate: localStorage.getItem("dateOfPublish"),
              ad: btoa(this.content),
              adPublishedBy: null,
              adPublishedProof: "",
            };
            
            this.userService.requestAd(ad).subscribe((res) => {
              console.log(res);
              this.spinner.hide();
              swal("success","","success");
              this.router.navigateByUrl("/myAds");
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
