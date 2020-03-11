import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AboutComponent } from './component/about/about.component';
import { HomeComponent } from './component/home/home.component';


const routes: Routes = [
  { path : "",component:LoginComponent},
  { path : "signUp",component:SignupComponent},
  {path:"about" ,component:AboutComponent},
  {path:"home",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
