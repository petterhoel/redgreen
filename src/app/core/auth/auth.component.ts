import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  maybeCorsError = false;
  authError = false;

  pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  private subs = new SubSink();
  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.subs.sink = this.credentials$.subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  clearCredentials(): void {
    this.authService.clearAuthentication();
    this.clearErrors()
  }

  private clearErrors(): void {
    this.maybeCorsError = false;
    this.authError = false;
  }

  async submitForm(): Promise<any> {
    this.clearErrors()
    try {
      await this.authService.tryCredentials(this.credentials)
      await this.router.navigate(['dashboard'])
    } catch (responseError) {
      const { status } = responseError;
      if (status === 0) {
        this.maybeCorsError = true;
      }
      if (status === 401) {
        this.authError = true;
      }
      this.cdr.detectChanges();
    }
  }
}
