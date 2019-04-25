import { Injectable, OnDestroy } from '@angular/core';
import { ServerInfo } from 'src/app/dashboard/model/server-info';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService implements OnDestroy{
  serverUrl = '';
  serverSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private http: HttpClient) {
    this.authService.currentServer()
      .subscribe(server => this.serverUrl = server);

    }

  ngOnDestroy(): void {
    if (!this.serverSubscription) {
      this.serverSubscription.unsubscribe();
    }
  }

  getServerInfo(): Promise<ServerInfo> {
    const url = `${this.serverUrl}/app/rest/latest/server`;
    return this.http.get<ServerInfo>(url).toPromise();
  }
}
