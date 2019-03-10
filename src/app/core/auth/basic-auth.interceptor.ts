import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const header = this.authService.getAuthHeaders();
    if (!header) {
      return next.handle(request);
    }

    const headers = new HttpHeaders({
      Authorization: header
    });
    request = request.clone({
      headers
    });
    return next.handle(request);
  }
}
