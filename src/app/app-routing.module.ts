import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';

const routes: Routes = [
  {
    path: `server`,
    component: AuthComponent
  },
  {
    path: ``,
    redirectTo: `server`,
    pathMatch: `full`
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
