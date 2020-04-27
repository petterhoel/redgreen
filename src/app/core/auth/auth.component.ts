import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { ServerCredentials } from './server-credentials';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit, OnDestroy {
  credentials: ServerCredentials = {server: '', token: ''};
  server = ``;
  credentials$ = this.authService
    .logins$
    .pipe(tap((value: ServerCredentials) => {
      this.credentials = value;
    }));

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
    this.trimCredentialValues();
    this.authService.setAuth(this.credentials);
    this.authService.isLoggedIn()
      .then(
        () => this.router.navigate(['dashboard']),
        error => console.log(error)
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
