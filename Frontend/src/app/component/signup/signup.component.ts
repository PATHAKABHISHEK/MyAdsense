import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}

  signUpButton(signUp) {
    this.userService
      .signUp({
        firstName: signUp.firstName,
        lastName: signUp.lastName,
        emailId: signUp.emailId,
        password: signUp.password,
        mobileNumer: signUp.mobileNumber
      })
      .subscribe(res => {
        console.log(res);
      });
  }
}
