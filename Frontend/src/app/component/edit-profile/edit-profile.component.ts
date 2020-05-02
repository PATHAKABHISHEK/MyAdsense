import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Router} from "@angular/router";
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
userId=localStorage.getItem("userId");

  profile={
    userId:localStorage.getItem("userId"),
    firstName:localStorage.getItem("firstName"),
    lastName:localStorage.getItem("lastName"),
    emailId:localStorage.getItem("emailId"),
    mobileNumber:localStorage.getItem("mobileNo"),
    userProfile:null
  }
  selectedImage: any;
  imgUrl= null;
  pic =null;
  profileDetail: any;
  imageUrl=null;
  img:any;
  imageFile: any;
  profilePic: string;
  constructor(private userService:UserService,private spinner : NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.profilePic=localStorage.getItem("profilePic");
    this.imgUrl="data:image/jpg;base64,"+this.profilePic;
    this.userService.getUserProfile(this.userId).subscribe(res=>{
      this.profileDetail=res;
      console.log(res.userProfile);
      this.spinner.hide();
      
    })
  }

  editProfile(){
    this.profile.firstName=this.profileDetail.firstName;
    this.profile.lastName=this.profileDetail.lastName;
    this.profile.emailId=this.profileDetail.emailId;
    this.profile.mobileNumber=this.profileDetail.mobileNumber;
 
    this.userService.editUserProfile(this.profile)
    .subscribe(res=>{
      console.log(res);
      localStorage.setItem("firstName",this.profile.firstName);
      localStorage.setItem("lastName",this.profile.lastName);
      localStorage.setItem("emailId",this.profile.emailId);
      localStorage.setItem("mobileNo",this.profile.mobileNumber);
      localStorage.setItem("userName",this.profile.firstName+" "+this.profile.lastName);
      this.router.navigateByUrl("/userProfile");
    });
  }

  
  onProfilePicUpload(event) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = event2 => {
      this.imgUrl = reader.result;

      // setting profile pic in local storage
      // localStorage.setItem('profilePicUrl', this.imgURL);
    };
    const filereader = new FileReader();
    filereader.onload = e => {
      this.profile.userProfile = filereader.result;
      this.profile.userProfile = btoa(this.profile.userProfile);
    };
    filereader.readAsBinaryString(this.selectedImage);
    console.log(this.imgUrl);
    // localStorage.setItem("profilePic",);
  }




}
