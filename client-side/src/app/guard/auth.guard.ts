import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggedIn = false
  constructor (private authService:AuthService, private router:Router, navBar: NavbarComponent){}

  canActivate(): boolean {
    if(this.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}