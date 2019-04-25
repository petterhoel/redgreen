import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import * as Sentry from '@sentry/browser';
import { environment } from 'src/environments/environment';

if (environment.production) {
  const dsn = `https://ec58c48d80c74996a9d183287dab71e7@sentry.io/1433999`;
  Sentry.init({ dsn });
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    // Sentry.showReportDialog({ eventId });
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    DashboardModule
  ],
  providers: [{ provide: ErrorHandler, useClass: environment.production ? SentryErrorHandler : ErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
