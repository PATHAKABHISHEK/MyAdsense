import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import swal from "sweetalert";
import { NewspaperService } from 'src/app/service/newspaper.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService ,private router : Router, private newspaperService:NewspaperService) {}
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
        localStorage.setItem("firstName",res.firstName);
        localStorage.setItem("lastName",res.lastName);
        localStorage.setItem("userId",res.id);
        localStorage.setItem("userRole",res.userRole);
        this.userName=res.firstName+" "+res.lastName;
        localStorage.setItem("userName",this.userName);
        localStorage.setItem("emailId",res.emailId);
        localStorage.setItem("mobileNo",res.mobileNumber);
        // console.log(this.stringFromArray(res.userProfile.data));
        localStorage.setItem("profilePic",this.stringFromArray(res.userProfile.data));
        if(res.userRole==="SUBSCRIBER"){
          if(res.userStatus==="ACTIVE"){
            this.router.navigateByUrl("/home");
          }
          else{
            this.router.navigateByUrl("/accountVerify");
          }
  
        }
        else if(res.userRole==="PUBLISHER"){
          this.router.navigateByUrl("/adlist");
        }
        }
        else{
          swal("Incorrect Credential","","danger");
        }
      });
      this.newspaperService.get_all_newspaper_logos()
      .subscribe(res=>{
        console.log(res);
      })
  }
  stringFromArray(data)
  {
    var count = data.length;
    var str = "";
    
    for(var index = 0; index < count; index += 1)
      str += String.fromCharCode(data[index]);
    
    return btoa(str);
  }
}
