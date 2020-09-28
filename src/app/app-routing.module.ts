import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { LatestBuildsComponent } from './dashboard/latest-builds/latest-builds.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { AboutComponent } from './core/about/about.component';

const routes: Routes = [
  {
    path: `sign-in`,
    component: AuthComponent
  },
  {
    path: `dashboard`,
    component: LatestBuildsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: `settings`,
    component: SettingsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: `about`,
    component: AboutComponent,
  },
  {
    path: ``,
    redirectTo: `dashboard`,
    pathMatch: `full`
  },
  { path: '**', redirectTo: `about` }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
