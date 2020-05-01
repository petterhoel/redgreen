import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { ServerCredentials } from './server-credentials';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  credentials: ServerCredentials = {server: 'https://', token: ''};
  credentials$ = this.authService
    .logins$
    .pipe(tap((value: ServerCredentials) => {
      this.credentials = value;
    }));

  hostname = location.hostname;
  authError = false;

  pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  private subs = new SubSink();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subs.sink = this.credentials$.subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  clearCredentials(): void {
    this.authService.clearAuthentication();
  }

  submitForm(): void {
    this.authError = false

    this.authService.setAuth(this.credentials);
    this.authService.isLoggedIn()
      .then(
        () => this.router.navigate(['dashboard']),
        responseError => {
          const { error, status } = responseError;
          if (error && status === 0) {
            this.authError = true;
          }
        }
      );
  }

  trimCredentialValues(): void {
    const {server, token} = this.credentials;
    this.credentials = {
      server: server.trim(),
      token: token.trim()
    }
  }
}
