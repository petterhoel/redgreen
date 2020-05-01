import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServerCredentials } from './server-credentials';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginsSource$ = new BehaviorSubject<ServerCredentials>(new ServerCredentials());
  logins$ = this.loginsSource$.asObservable();
  private get server(): string {
    return this.loginsSource$.value.server;
  }

  constructor(private http: HttpClient, private credService: CredentialsService) {
    this.init();
  }

  tryCredentials(credentials: ServerCredentials): Promise<any> {
    credentials = this.trimCredentialValues(credentials);
    this.setAuth(credentials);
    const url = `${this.server}/app/rest/latest/server`;
    return this.http.get(url).toPromise();
  }

  checkLoggedIn(): Promise<any> {
    return this.tryCredentials(this.loginsSource$.value);
  }

  clearAuthentication(): void {
    this.credService.clearCredentials();
    this.loginsSource$.next(this.credService.getCredentials());
  }

  trimCredentialValues(credentials: ServerCredentials): ServerCredentials {
    const {server, token} = credentials;
    return {
      server: server.trim(),
      token: token.trim()
    }
  }

  private init(): void {
    this.loginsSource$.next(this.credService.getCredentials());
  }

  private setAuth(credentials: ServerCredentials): void {
    this.credService.saveCredentials(credentials);
    this.loginsSource$.next(credentials);
  }
}
