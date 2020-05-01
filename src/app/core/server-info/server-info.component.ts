import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ServerDataService } from './server-data.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-server-info',
  templateUrl: './server-info.component.html',
  styleUrls: ['./server-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerInfoComponent {
  server$ = this.serverData.getServerInfo().pipe(catchError(() => of(null)));
  constructor( private serverData: ServerDataService) {
  }
}
