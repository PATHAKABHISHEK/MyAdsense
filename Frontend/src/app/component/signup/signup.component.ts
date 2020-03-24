import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import {Router} from "@angular/router";
import swal from "sweetalert";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService , private router:Router) {}

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
        swal("successfully register","","success");
        this.router.navigateByUrl("/login");
      });
  }
}
