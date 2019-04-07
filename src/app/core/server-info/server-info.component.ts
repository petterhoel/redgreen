import { Component, OnInit } from '@angular/core';
import { ServerDataService } from './server-data.service';
import { ServerInfo } from 'src/app/dashboard/model/server-info';
import { AuthService } from '../auth/auth.service';

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
      .subscribe(info => this.server = info);
  }
}
