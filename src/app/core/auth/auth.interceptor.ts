import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from './credentials.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private credentialsService: CredentialsService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.credentialsService.getAuthToken();
    if (!token) {
      return next.handle(request);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    request = request.clone({
      headers
    });
    return next.handle(request);
  }
}
