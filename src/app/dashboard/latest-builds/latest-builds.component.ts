import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BuildStoreService } from '../build-store.service';
import { tap } from 'rxjs/operators';
import { BuildUpdateService } from '../../core/build-update.service';

@Component({
  selector: 'app-latest-builds',
  templateUrl: './latest-builds.component.html',
  styleUrls: ['./latest-builds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestBuildsComponent implements OnDestroy{
  builds$ = this.buildData
    .filteredBuilds$
    .pipe(tap(() => this.runUpdated()));

  constructor(private buildData: BuildStoreService,
              private updatedService: BuildUpdateService) { }

  runUpdated(): void {
    this.updatedService.updateText();
  }

  ngOnDestroy(): void {
    this.updatedService.clear()
  }
}
