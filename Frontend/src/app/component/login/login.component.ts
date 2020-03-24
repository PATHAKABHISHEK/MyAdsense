import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService ,private router : Router) {}
  emailId;
  password;
  ngOnInit() {}

  signIn() {
    console.log("hh");
    this.userService
      .signIn({
        emailId: this.emailId,
        password: this.password
      })
      .subscribe(res => {
        console.log(res);
        this.router.navigateByUrl("/home");
      });
  }
}
