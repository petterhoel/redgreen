import { Component } from '@angular/core';
import { ServerDataService } from './server-data.service';

@Component({
  selector: 'app-server-info',
  templateUrl: './server-info.component.html',
  styleUrls: ['./server-info.component.scss']
})
export class ServerInfoComponent {
  server$ = this.serverData.getServerInfo();
  constructor( private serverData: ServerDataService) { }
}
