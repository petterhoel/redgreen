import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject, interval } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';
import { BuildType } from './model/build-type';
import { BuildTypes } from './model/build-types';
import { BuildInfo } from './model/build-info';
import { Build } from './model/build';
import { Change } from './model/change';

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
  private buildInfoSource = new BehaviorSubject<BuildInfo[]>([]);
  intervalSubscription: Subscription;
  interval = 60000;

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
    this.init();
  }

  ngOnDestroy(): void {
    if (this.urlSubscription) {
      this.urlSubscription.unsubscribe();
    }
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
   }

  init(): void {
    this.urlSubscription = this.authService.currentServer()
      .subscribe(url => {
        this.apiurl = url;
        this.fetchNowAndOnIterval();
      });
  }

  fetchNowAndOnIterval(): void {
    this.fetchLatestBuilds();
    this.intervalSubscription = interval(this.interval)
      .subscribe(() => this.fetchLatestBuilds());
  }

  fetchLatestBuilds(): void {
    const url = `${this.apiurl}/${this.prefixUrl}buildTypes?${this.query}`;
    this.http.get<BuildTypes>(url).toPromise()
      .then(response => {
        const infolist = this.mapList(response.buildType);
        this.buildInfoSource.next(infolist);
      });
  }

  getLatestBuilds(): Observable<BuildInfo[]> {
    return this.buildInfoSource.asObservable();
  }

  mapList(serverList: BuildType[]): BuildInfo[] {
    const infolist = serverList.map(item => this.buildTypeToBuildInfo(item));
    return infolist;
  }

  buildTypeToBuildInfo(deepBuild: BuildType): BuildInfo {
    const build = deepBuild.builds.build.length ? deepBuild.builds.build[0] : new Build();
    const change = build && build.lastChanges && build.lastChanges.change.length ? build.lastChanges.change[0] : new Change();
    const { id, name } = deepBuild;
    const { number, status, statusText, branchName } = build;
    const { username, date, comment, version: commit } = change;

    const flatbuild: BuildInfo = {
      id,
      name,
      number,
      status,
      statusText,
      branchName: branchName ? branchName : '',
      username,
      date,
      comment,
      commit,
    };
    return flatbuild;
  }
}
