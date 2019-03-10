import { Component, OnInit } from '@angular/core';
import { BuildDataService } from '../build-data.service';
import { Subscription } from 'rxjs';
import { BuildTypes } from '../model/build-types';

@Component({
  selector: 'app-latest-builds',
  templateUrl: './latest-builds.component.html',
  styleUrls: ['./latest-builds.component.scss']
})
export class LatestBuildsComponent implements OnInit {
  builds: BuildTypes = null;
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
