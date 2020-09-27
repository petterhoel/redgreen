import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestBuildsComponent } from './latest-builds/latest-builds.component';
import { BuildInfoComponent } from './build-info/build-info.component';
import { RouterModule } from '@angular/router';
import { BranchPipe } from './branch.pipe';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DateFnsModule } from 'ngx-date-fns';


@NgModule({
  declarations: [
    LatestBuildsComponent,
    BuildInfoComponent,
    BranchPipe,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    DateFnsModule.forRoot()
  ],
  exports: [
    LatestBuildsComponent
  ]
})
export class DashboardModule { }
