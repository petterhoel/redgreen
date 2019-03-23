import { Component, OnInit } from '@angular/core';
import { BuildDataService } from '../build-data.service';
import { Subscription } from 'rxjs';
import { BuildType } from '../model/build-type';
import { BuildInfo } from '../model/build-info';

@Component({
  selector: 'app-latest-builds',
  templateUrl: './latest-builds.component.html',
  styleUrls: ['./latest-builds.component.scss']
})
export class LatestBuildsComponent implements OnInit {
  builds: BuildInfo[] = [];
  buildSubscription: Subscription;
  constructor(private buildData: BuildDataService) { }

  ngOnInit() {
    this.buildSubscription = this.buildData
      .getLatestBuilds()
      .subscribe(builds => {
        this.builds = builds;
      });
  }

}
