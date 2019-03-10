import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { BuildTypes } from './model/build-types';
import { AuthService } from '../core/auth/auth.service';

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

  private buildInfoSource = new BehaviorSubject<BuildTypes>(null);

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
        console.log(url);
        this.apiurl = url;
        this.fetchLatestBuilds();
      });
  }

  fetchLatestBuilds(): void {
    const url = `${this.apiurl}/${this.prefixUrl}buildTypes?${this.query}`;
    this.http.get<BuildTypes>(url).toPromise()
      .then(response => this.buildInfoSource.next(response));
  }


  getLatestBuilds(): Observable<BuildTypes> {
    return this.buildInfoSource.asObservable();
   }
}
