import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestBuildsComponent } from './latest-builds/latest-builds.component';
import { BuildInfoComponent } from './build-info/build-info.component';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { BranchPipe } from './branch.pipe';

@NgModule({
  declarations: [
    LatestBuildsComponent,
    BuildInfoComponent,
    BranchPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MomentModule,
  ],
  exports: [
    LatestBuildsComponent
  ]
})
export class DashboardModule { }
