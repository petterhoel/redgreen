import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { LatestBuildsComponent } from './dashboard/latest-builds/latest-builds.component';

const routes: Routes = [
  {
    path: `server`,
    component: AuthComponent
  },
  {
    path: `dashboard`,
    component: LatestBuildsComponent
  },
  {
    path: ``,
    redirectTo: `dashboard`,
    pathMatch: `full`
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
