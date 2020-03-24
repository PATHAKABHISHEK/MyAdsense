import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public AuthService:UserService,public router:Router){
  }
  
  canActivate():boolean{
    if(this.AuthService.loggedIn()){
      return true
    }
    else{
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
