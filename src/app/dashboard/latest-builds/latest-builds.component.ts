import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuildDataService } from '../build-data.service';
import { Subscription } from 'rxjs';
import { BuildInfo } from '../model/build-info';

@Component({
  selector: 'app-latest-builds',
  templateUrl: './latest-builds.component.html',
  styleUrls: ['./latest-builds.component.scss']
})
export class LatestBuildsComponent implements OnInit, OnDestroy {
  builds: BuildInfo[] = [];
  buildSubscription: Subscription;

  updated: Date = null;
  constructor(private buildData: BuildDataService) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.buildSubscription = this.buildData
      .getLatestBuilds()
      .subscribe(builds => {
        if (builds && builds.length) {
          this.onDataRetrieved(builds);
        }
      });
  }

  onDataRetrieved(builds: BuildInfo[]): void {
    this.builds = builds;
    this.updated = new Date();
  }

  ngOnDestroy(): void {
    if (this.buildSubscription) {
      this.buildSubscription.unsubscribe();
    }

  }
}
