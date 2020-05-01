import { Injectable } from '@angular/core';
import { ServerInfo } from 'src/app/dashboard/model/server-info';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseDataService } from 'src/app/shared/base-data.service';
import { CredentialsService } from '../auth/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService extends BaseDataService {
  constructor(credentialsService: CredentialsService, http: HttpClient) {
    super(credentialsService, http);
  }

  getServerInfo(): Observable<ServerInfo> {
    const url = `${this.serverUrl}/guestAuth/app/rest/latest/server`;
    return this.http.get<ServerInfo>(url);
  }
}
