import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      await this.auth.checkLoggedIn()
      return true;
    } catch (error) {
      console.log('ERRRRRRR')
      await this.router.navigate(['server']);
      return false;
    }
  }
}
