import { Component, OnInit } from '@angular/core';
import { ServerDataService } from './server-data.service';
import { ServerInfo } from 'src/app/dashboard/model/server-info';
import { AuthService } from '../auth/auth.service';
import { isThenable } from '@sentry/utils';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-server-info',
  templateUrl: './server-info.component.html',
  styleUrls: ['./server-info.component.scss']
})
export class ServerInfoComponent implements OnInit {
  server: ServerInfo;
  constructor(
    private serverData: ServerDataService,
    private authService: AuthService) { }

  ngOnInit(): void  {
    this.authService.currentServer()
      .subscribe(server => {
        this.getServerInfo();
      });
  }

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
