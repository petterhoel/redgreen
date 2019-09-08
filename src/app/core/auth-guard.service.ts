import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      await this.auth.isLoggedIn();
      return true;
    } catch (error) {
      this.router.navigate(['server']);
      return false;
    }
  }
}
