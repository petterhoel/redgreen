import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestBuildsComponent } from './latest-builds/latest-builds.component';
import { BuildInfoComponent } from './build-info/build-info.component';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { BranchPipe } from './branch.pipe';
import { SettingsComponent } from './settings/settings.component';
import { ToggleComponent } from '../dashboard/toggle/toggle.component';


@NgModule({
  declarations: [
    LatestBuildsComponent,
    BuildInfoComponent,
    BranchPipe,
    SettingsComponent,
    ToggleComponent,
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
