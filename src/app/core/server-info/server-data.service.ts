import { Injectable } from '@angular/core';
import { ServerInfo } from 'src/app/dashboard/model/server-info';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {
  serverUrl = '';
  server$ = this.authService
    .server$
    .pipe(
      tap(server => this.serverUrl = server));

  constructor(
    private authService: AuthService,
    private http: HttpClient) {
    }

  getServerInfo(): Promise<ServerInfo> {
    const url = `${this.serverUrl}/app/rest/latest/server`;
    return this.http.get<ServerInfo>(url).toPromise();
  }
}
