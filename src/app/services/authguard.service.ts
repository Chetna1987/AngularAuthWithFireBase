import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private authservice:AuthService,private router:Router) { }
  canActivate() {

    if (!this.authservice.isLoggedIn)
    {
       this.router.navigate(['login']);
       return false;
    }
    return true;
  }
}
