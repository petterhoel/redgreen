import { Injectable, OnDestroy } from '@angular/core';
import { ServerInfo } from 'src/app/dashboard/model/server-info';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService implements OnDestroy{
  serverUrl = '';
  server$ = this.authService
    .server$
    .pipe(
      tap(server => {
       console.log('server',server);

        this.serverUrl = server
      }));
  private subsink = new SubSink();

  constructor(
    private authService: AuthService,
    private http: HttpClient) {
      this.subsink.sink = this.server$.subscribe();
    }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  getServerInfo(): Promise<ServerInfo> {
    const url = `${this.serverUrl}/app/rest/latest/server`;
    return this.http.get<ServerInfo>(url).toPromise();
  }
}
