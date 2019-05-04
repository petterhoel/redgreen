import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  server = ``;
  server$ = this.authService
    .server$
    .pipe(tap(value => this.server = value));
  user$ = this.authService
    .user$
    .pipe(tap(username => this.username = username));

  pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  serverConnection = false;
  username = ``;
  password = ``;
  constructor(private authService: AuthService) {}

  updateCredentials(): void {
    this.authService.updateCredentials(this.username, this.password);
  }

  test(): void {
    this.serverConnection = false;
    this.authService.test()
      .then(
        () => this.serverConnection = true,
        error => this.errorHandler(error)
      );
  }

  errorHandler(error): void {
    this.serverConnection = false;
    switch (error.status) {
      case 0: console.log(error); break;
      case 401: alert('There was an error testing the server connection.\n\nInvalid credentials'); break;
      default: break;
    }
  }

  updateServer(): void {
    this.authService.updateServer(this.server);
  }
}
