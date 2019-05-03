import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public server$ = new BehaviorSubject<string>('https://');
  public user$ = new BehaviorSubject<string>('');
  private readonly localStoarageServerKey = 'teamcity-server';
  private readonly localStoarageUserKey = 'username';
  private readonly sessionStorageBasicHeaderKey = 'basic-header';

  constructor(private http: HttpClient) {
    const server = localStorage.getItem(this.localStoarageServerKey);
    if (server) {
      this.updateServer(server);
    }
    const user = localStorage.getItem(this.localStoarageUserKey);
    if (user) {
      this.updateUser(user);
    }
   }

  updateServer(server: string): void {
    localStorage.setItem(this.localStoarageServerKey, server);
    this.server$.next(server);
  }

  test(): Promise<any> {
    const url = `${this.server$.value}/app/rest/latest/server`;
    return this.http.get(url).toPromise();
  }

  private btoaCredentials(username: string, password: string): string {
    const toEncode = `${username}:${password}`;
    return btoa(toEncode);
  }

  private updateBasicAuthHeader(username: string, password: string) {
    const basicAuthHeader = `Basic ${this.btoaCredentials(username, password)}`;
    sessionStorage.setItem(this.sessionStorageBasicHeaderKey, basicAuthHeader);
  }

  getAuthHeaders(): string {
    return sessionStorage.getItem(this.sessionStorageBasicHeaderKey);
  }

  private updateUser(username: string): void {
    this.user$.next(username);
    localStorage.setItem(this.localStoarageUserKey, username);
  }

  updateCredentials(username: string, password: string): void {
    this.updateUser(username);
    this.updateBasicAuthHeader(username, password);
  }
}
