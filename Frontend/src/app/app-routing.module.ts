import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AboutComponent } from './component/about/about.component';
import { HomeComponent } from './component/home/home.component';
import { RecuitmentComponent } from './component/recuitment/recuitment.component';
import { RateComponent } from './component/rate/rate.component';
import { NewstemplateComponent } from './component/newstemplate/newstemplate.component';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { MyadsComponent } from './component/myads/myads.component';
import { AdslistComponent } from './component/adslist/adslist.component';
import { AccountVerificationComponent } from './component/account-verification/account-verification.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';



const routes: Routes = [
  { path : "",component:LoginComponent},
  { path : "signUp",component:SignupComponent},
  {path:"about" ,component:AboutComponent},
  {path:"home",component:HomeComponent, canActivate: [AuthGuard]},
  {path:"recuitment", component:RecuitmentComponent, canActivate: [AuthGuard]},
  {path:"rate",component:RateComponent, canActivate: [AuthGuard]},
  {path:"newsContent",component:NewstemplateComponent, canActivate: [AuthGuard]},
  {path:"userProfile",component:UserProfileComponent},
  {path:"myAds",component:MyadsComponent},
  {path:"adlist",component:AdslistComponent},
  {path:"accountVerify",component:AccountVerificationComponent},
  {path:"editProfile",component:EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
