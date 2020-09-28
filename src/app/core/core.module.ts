import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ServerInfoComponent } from './server-info/server-info.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AutoFocusDirective } from './auth/auto-focus.directive';
import { HintComponent } from './hint/hint.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { DateFnsModule } from 'ngx-date-fns';
import { BuildUpdateService } from './build-update.service';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AuthComponent,
    NavbarComponent,
    ServerInfoComponent,
    InfoBoxComponent,
    AutoFocusDirective,
    HintComponent,
    StatusBarComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DateFnsModule.forRoot(),
    SharedModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [
    NavbarComponent,
    StatusBarComponent,
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
