import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestBuildsComponent } from './latest-builds/latest-builds.component';
import { BuildInfoComponent } from './build-info/build-info.component';

@NgModule({
  declarations: [
    LatestBuildsComponent,
    BuildInfoComponent
  ],
  imports: [
    CommonModule
    ,
  ],
  exports: [
    LatestBuildsComponent
  ]
})
export class DashboardModule { }
