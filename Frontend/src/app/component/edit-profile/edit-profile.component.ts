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
  imgUrl: string;
  pic =null;
  profileDetail: any;
  imageUrl:any;
  img:any;
  imageFile: any;
  profilePic: string;
  constructor(private userService:UserService,private spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.profilePic=localStorage.getItem("profilePic");
    this.imgUrl="data:image/png;base64,"+this.profilePic;
    this.userService.getUserProfile(this.userId).subscribe(res=>{
      this.profileDetail=res;
      console.log(res.userProfile);
      this.spinner.hide();
      
    })
  }

  editProfile(){
    this.userService.editUserProfile(this.profile)
    .subscribe(res=>{
      console.log(res);
    });
  }

  
  // onImageUpload(event) {
  //   this.selectedImage = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = event2 => {
  //     this.imgUrl = reader.result;

  //     // setting profile pic in local storage
  //     // localStorage.setItem('profilePicUrl', this.imgURL);
  //   };
  //   const filereader = new FileReader();
  //   filereader.onload = e => {
  //     this.badgeData.pic = filereader.result;
  //     this.badgeData.pic = btoa(this.badgeData.pic);
  //   };
  //   filereader.readAsBinaryString(this.selectedImage);
  // }


  onProfilePicUpload(event){
    this.imageFile = event.target.files[0];
    const filereader =new FileReader();
    filereader.readAsDataURL(event.target.files[0]);
    filereader.onload = e=>{
      this.profile.userProfile=filereader.result;
      this.profile.userProfile=btoa(this.profile.userProfile);
    };
    filereader.readAsBinaryString(this.imageFile);
    console.log(this.profile.userProfile);
    this.imgUrl= this.profile.userProfile;
}

}
