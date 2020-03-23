import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AboutComponent } from './component/about/about.component';
import { HomeComponent } from './component/home/home.component';
import { MatrimonialComponent } from './component/matrimonial/matrimonial.component';
import { PropertyComponent } from './component/property/property.component';
import { RecuitmentComponent } from './component/recuitment/recuitment.component';
import { RateComponent } from './component/rate/rate.component';


const routes: Routes = [
  { path : "",component:LoginComponent},
  { path : "signUp",component:SignupComponent},
  {path:"about" ,component:AboutComponent},
  {path:"home",component:HomeComponent},
  {path:"matrimonial", component:MatrimonialComponent},
  {path:"property", component:PropertyComponent},
  {path:"recuitment", component:RecuitmentComponent},
  {path:"rate",component:RateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
