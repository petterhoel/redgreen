import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuildTypes } from './model/build-types';
import { BaseDataService } from '../shared/base-data.service';
import { CredentialsService } from '../core/auth/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class BuildDataService extends BaseDataService {
  private readonly rootProject = '_Root';
  private readonly prefixUrl = 'app/rest/latest/';
  private readonly locator = `locator=affectedProject:(id:${this.rootProject})`;
  // tslint:disable-next-line:max-line-length
  private readonly fields = `fields=buildType(id,name,builds($locator(count:1),build(branchName,agent,number,status,statusText,lastChanges(change(id,version,username,date,comment)))))`;
  private readonly query = `${this.locator}&${this.fields}`;

  constructor(http: HttpClient, credentialsService: CredentialsService) {
    super(credentialsService, http);
  }

  getLatestBuilds(): Observable<BuildTypes> {
    const url = `${this.serverUrl}/${this.prefixUrl}buildTypes?${this.query}`;
    return this.http.get<BuildTypes>(url);
  }
}
