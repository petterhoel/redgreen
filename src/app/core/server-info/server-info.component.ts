import { Component } from '@angular/core';
import { ServerDataService } from './server-data.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-server-info',
  templateUrl: './server-info.component.html',
  styleUrls: ['./server-info.component.scss']
})
export class ServerInfoComponent {
  server$ = this.serverData.getServerInfo().pipe(
    catchError(error => this.handleError)
  );
  constructor(
    private serverData: ServerDataService) { }

  handleError(error): void {
    switch (error.status) {
      case 0: break;
      case 401: alert('There was an error getting server info.\n\nInvalid credentials'); break;
      default:
        break;
    }
  }
}
