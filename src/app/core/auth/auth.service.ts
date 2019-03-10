import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverSource = new BehaviorSubject<string>('https://');
  private userSource = new BehaviorSubject<string>('');
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

  currentServer(): Observable<string> {
    return this.serverSource.asObservable();
  }

  currentUser(): Observable<string> {
    return this.userSource.asObservable();
  }

  updateServer(server: string): void {
    localStorage.setItem(this.localStoarageServerKey, server);
    this.serverSource.next(server);
  }

  test(): Observable<any> {
    const url = `${this.serverSource.value}/app/rest/latest/server`;
    return this.http.get(url);
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
    this.userSource.next(username);
    localStorage.setItem(this.localStoarageUserKey, username);
  }

  updateCredentials(username: string, password: string): void {
    this.updateUser(username);
    this.updateBasicAuthHeader(username, password);
  }
}
