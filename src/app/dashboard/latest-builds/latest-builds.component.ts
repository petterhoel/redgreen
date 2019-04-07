import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuildInfo } from '../model/build-info';
import { BuildStoreService } from '../build-store.service';

@Component({
  selector: 'app-latest-builds',
  templateUrl: './latest-builds.component.html',
  styleUrls: ['./latest-builds.component.scss']
})
export class LatestBuildsComponent implements OnInit, OnDestroy {
  builds: BuildInfo[] = [];
  filteredBuilds: BuildInfo[] = [];
  buildSubscription: Subscription;
  filteredBuildSubscription: Subscription;

  updated: Date = null;
  constructor(private buildData: BuildStoreService) { }

  ngOnInit() {
    this.getAllBuilds();
    this.getFilteredBuilds();
  }

  getAllBuilds(): void {
    this.buildSubscription = this.buildData
      .getLatestBuilds()
      .subscribe(builds => {
        if (builds && builds.length) {
          this.onAllBuildsRetrieved(builds);
        }
      });
  }

  getFilteredBuilds(): void {
    this.filteredBuildSubscription = this.buildData
      .getLatestBuildsFiltered()
      .subscribe(builds => {
        if (builds && builds.length) {
          this.onFilteredRetrieved(builds);
        }
      });
  }

  onAllBuildsRetrieved(builds: BuildInfo[]): void {
    this.builds = builds;
    this.updated = new Date();
  }

  onFilteredRetrieved(builds: BuildInfo[]): void {
    this.filteredBuilds = builds;
    this.updated = new Date();
  }

  ngOnDestroy(): void {
    if (this.buildSubscription) {
      this.buildSubscription.unsubscribe();
    }
    if (this.filteredBuildSubscription) {
      this.filteredBuildSubscription.unsubscribe();
    }
  }
}
