import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

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
    mobileNumber:localStorage.getItem("mobileNo")
  }
  selectedImage: any;
  imgURL: string | ArrayBuffer;
  pic =null;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUserProfile(this.userId).subscribe(res=>{
      console.log(res);
    })
  }

  editProfile(){
    this.userService.editUserProfile(this.profile)
    .subscribe(res=>{
      console.log(res);
    });
  }

  
  onProfilePicUpload(event){
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      var output = document.getElementById('output');
      // output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
}
}
