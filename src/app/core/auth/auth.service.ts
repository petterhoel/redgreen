import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServerCredentials } from './server-credentials';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private defaultCredentials: ServerCredentials = {server: 'https://', token: '' }
  private loginsSource$ = new BehaviorSubject<ServerCredentials>(new ServerCredentials());
  logins$ = this.loginsSource$.asObservable();
  private get server(): string {
    return this.loginsSource$.value.server;
  }

  constructor(private http: HttpClient, private credService: CredentialsService) {
    this.init();
  }

  private init(): void {
    this.loginsSource$.next(this.credService.getCredentials());
  }

  isLoggedIn(): Promise<any> {
    const url = `${this.server}/app/rest/latest/server`;
    return this.http.get(url).toPromise();
  }

  clearAuthentication(): void {
    this.credService.clearCredentials();
    this.loginsSource$.next(this.credService.getCredentials());
   }


  setAuth(credentials: ServerCredentials): Promise<any> {
    this.credService.setCredentials(credentials);
    this.loginsSource$.next(credentials);
    return this.isLoggedIn();
  }
}
