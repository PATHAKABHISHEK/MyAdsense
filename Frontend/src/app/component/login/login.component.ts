import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService ,private router : Router) {}
  emailId;
  password;
  userName:string;
  isAuthenticated="N";
  ngOnInit() {
    localStorage.clear();
  }

  signIn() {
    console.log("hh");
    this.userService
      .signIn({
        emailId: this.emailId,
        password: this.password
      })
      .subscribe(res => {
        console.log(res);
        if(res){
        this.isAuthenticated="Y";
        localStorage.setItem('canNavigate', this.isAuthenticated);
        localStorage.setItem("username",res.firstName);
        localStorage.setItem("userId",res.id);
        localStorage.setItem("userRole",res.userRole);
        this.userName=res.firstName+" "+res.lastName;
        localStorage.setItem("userName",this.userName);
        localStorage.setItem("emailId",res.emailId);
        if(res.userRole==="SUBSCRIBER"){
          this.router.navigateByUrl("/home");
        }
        else if(res.userRole==="PUBLISHER"){
          this.router.navigateByUrl("/adlist");
        }
        }
        else{
          swal("Incorrect Credential","","danger");
        }
      });
  }
}
