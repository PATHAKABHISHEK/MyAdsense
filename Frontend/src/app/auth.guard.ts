import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router:Router){
  }
  
  canActivate():boolean{
    
    const isAuthenticated = localStorage.getItem('canNavigate');

    if(isAuthenticated=="Y"){
      return true
    }
    else{
      this.router.navigateByUrl("/");
      return false;
    }
  }
}
