import { Component, OnInit } from '@angular/core';
import { ServerDataService } from './server-data.service';
import { ServerInfo } from 'src/app/dashboard/model/server-info';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-server-info',
  templateUrl: './server-info.component.html',
  styleUrls: ['./server-info.component.scss']
})
export class ServerInfoComponent {
  server: ServerInfo;
  server$ = this.authService
    .server$
    .pipe(
      tap(() => this.getServerInfo()));
  constructor(
    private serverData: ServerDataService,
    private authService: AuthService) { }

  getServerInfo(): void {
    this.serverData.getServerInfo()
      .then(info => this.server = info)
      .catch(error => this.handelError(error));
  }

  handelError(error): void {
    switch (error.status) {
      case 0: break;
      case 401: alert('There was an error getting server info.\n\nInvalid credentials'); break;
      default:
        break;
    }
  }
}
