import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BuildStoreService } from '../build-store.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-latest-builds',
  templateUrl: './latest-builds.component.html',
  styleUrls: ['./latest-builds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestBuildsComponent {
  builds$ = this.buildData
    .filteredBuilds$
    .pipe(tap(() => this.updated$.next(new Date())));
  updated$ = new BehaviorSubject<Date>(new Date(0));
  constructor(private buildData: BuildStoreService) { }
}
