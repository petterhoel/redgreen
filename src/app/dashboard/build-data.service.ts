import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';
import { BuildTypes } from './model/build-types';

@Injectable({
  providedIn: 'root'
})
export class BuildDataService implements OnDestroy {
  private readonly rootProject = '_Root';
  private readonly prefixUrl = 'app/rest/latest/';
  private readonly locator = `locator=affectedProject:(id:${this.rootProject})`;
  // tslint:disable-next-line:max-line-length
  private readonly fields = `fields=buildType(id,name,builds($locator(count:1),build(branchName,agent,number,status,statusText,lastChanges(change(id,version,username,date,comment)))))`;
  private readonly query = `${this.locator}&${this.fields}`;
  private apiurl = '';
  private urlSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
    this.init();
  }

  ngOnDestroy(): void {
    if (this.urlSubscription) {
      this.urlSubscription.unsubscribe();
    }
  }

  init(): void {
    this.urlSubscription = this.authService.currentServer()
      .subscribe(url => {
        this.apiurl = url;
      });
  }

  getLatestBuilds(): Observable<BuildTypes> {
    const url = `${this.apiurl}/${this.prefixUrl}buildTypes?${this.query}`;
    return this.http.get<BuildTypes>(url);
  }





}
