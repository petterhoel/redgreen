import { Component } from '@angular/core';
import { BuildStoreService } from '../build-store.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-latest-builds',
  templateUrl: './latest-builds.component.html',
  styleUrls: ['./latest-builds.component.scss']
})
export class LatestBuildsComponent {
  builds$ = this.buildData
    .filteredBuilds$
    .pipe(tap(() => this.updated = new Date()));
  updated: Date = null;
  constructor(private buildData: BuildStoreService) { }
}
