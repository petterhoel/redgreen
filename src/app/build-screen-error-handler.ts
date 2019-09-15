import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BuildScreenErrorHandler implements ErrorHandler {
  constructor(private configService: ConfigService) { }
  handleError(error: any) {
    if (this.configService.config && this.configService.config.sentry.use) {
      Sentry.captureException(error.originalError || error);
    } else {
      console.error(error.originalError ? error.originalError.toString() : error.toString());
    }
  }
}
