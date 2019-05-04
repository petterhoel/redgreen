import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly sessionStorageBasicHeaderKey = 'basic-header';

  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = sessionStorage.getItem(this.sessionStorageBasicHeaderKey);
    if (user) {
      return true;
    }
    this.router.navigate(['server']);
    return false;
  }

}
