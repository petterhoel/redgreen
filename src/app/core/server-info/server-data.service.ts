import { Injectable, OnDestroy } from '@angular/core';
import { ServerInfo } from 'src/app/dashboard/model/server-info';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService implements OnDestroy {
  serverUrl$ = this.authService.server$;
  server$ = this.getServerInfo();
  private subsink = new SubSink();

  constructor(
    private authService: AuthService,
    private http: HttpClient) {
      this.subsink.sink = this.server$.subscribe();
    }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  getServerInfo(): Observable<ServerInfo> {
    const url = `${this.serverUrl$.value}/app/rest/latest/server`;
    return this.http.get<ServerInfo>(url);
  }
}
