import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BuildType } from './model/build-type';
import { BuildInfo } from './model/build-info';
import { Build } from './model/build';
import { Change } from './model/change';
import { BuildDataService } from './build-data.service';
import { Subscription, BehaviorSubject, interval, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildStoreService implements OnDestroy {

  private urlSubscription: Subscription;
  private readonly hiddenBuildKey = 'hiddenBuilds';
  private hiddenBuildIds = new BehaviorSubject<string[]>([]);
  private buildInfoSource = new BehaviorSubject<BuildInfo[]>([]);
  private filteredBuildInfoSource = new BehaviorSubject<BuildInfo[]>([]);
  intervalSubscription: Subscription;
  interval = 60000;

  constructor(private buildDataService: BuildDataService) {
    this.loadHiddenBuilds();
    this.fetchNowAndOnIterval();
  }

  ngOnDestroy(): void {
    if (this.urlSubscription) {
      this.urlSubscription.unsubscribe();
    }
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  private updtateHiddenbuilds(builds: string[]) {
    localStorage.setItem(this.hiddenBuildKey, JSON.stringify(builds));
    this.hiddenBuildIds.next(builds);
    const filteredList = this.buildInfoSource.value.filter(item => !builds.includes(item.id));
    this.filteredBuildInfoSource.next(filteredList);
  }

  private fetchNowAndOnIterval(): void {
    this.fetchLatestBuilds();
    this.intervalSubscription = interval(this.interval)
      .subscribe(() => this.fetchLatestBuilds());
  }

  private fetchLatestBuilds(): void {
    this.buildDataService.getLatestBuilds()
      .toPromise()
      .then(response => {
        const infolist = this.mapAndSortList(response.buildType);
        this.buildInfoSource.next(infolist);
        const hiddenIdList = this.hiddenBuildIds.value;
        const filteredList = infolist.filter(item => !hiddenIdList.includes(item.id));
        this.filteredBuildInfoSource.next(filteredList);
      });
  }

  private mapAndSortList(serverList: BuildType[]): BuildInfo[] {
    const infolist = serverList
      .map(item => this.buildTypeToBuildInfo(item))
      .sort(this.sort);
    return infolist;
  }

  getLatestBuilds(): Observable<BuildInfo[]> {
    return this.buildInfoSource.asObservable();
  }

  getLatestBuildsFiltered(): Observable<BuildInfo[]> {
    return this.filteredBuildInfoSource.asObservable();
  }

  getHiddenIds(): Observable<string[]> {
    return this.hiddenBuildIds.asObservable();
  }

  private getStoredHiddenBuildList(): string[] {
    const stringedItems = localStorage.getItem(this.hiddenBuildKey);
    if (!stringedItems) {
      return [];
    }
    const hiddenBuilds: string[] = JSON.parse(stringedItems);
    return hiddenBuilds;
  }

  private loadHiddenBuilds(): void {
    const buildsToHide = this.getStoredHiddenBuildList();
    this.hiddenBuildIds.next(buildsToHide);
  }

  toggleBuildVisibility(id: string): void {
    let hidden = this.getStoredHiddenBuildList();
    if (hidden.includes(id)) {
      hidden = hidden.filter(item => item !== id);
    } else {
      hidden.push(id);
    }
    this.updtateHiddenbuilds(hidden);
  }

  sort(a: BuildInfo, b: BuildInfo) { return a.id.localeCompare(b.id); }

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
