import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from "ngx-spinner";
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
  imgURL: string | ArrayBuffer;
  pic =null;
  profileDetail: any;
  imageUrl:any;
  img:any;
  imageFile: any;
  constructor(private userService:UserService,private spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.userService.getUserProfile(this.userId).subscribe(res=>{
      this.profileDetail=res;
      console.log(res.userProfile);
      this.spinner.hide();
      const TYPED_ARRAY = new Uint8Array(res.userProfile);
      this.imageUrl = res.userProfile.data
      console.log(this.imageUrl);
      
    })
  }

  editProfile(){
    this.userService.editUserProfile(this.profile)
    .subscribe(res=>{
      console.log(res);
    });
  }

  
  onProfilePicUpload(event){
    this.imageFile = event.target.files[0];
    const filereader =new FileReader();
    filereader.onload = e=>{
      this.profile.userProfile=filereader.result;
      this.profile.userProfile=btoa(
        this.profile.userProfile
      );
    };
    filereader.readAsBinaryString(this.imageFile);
}
}
