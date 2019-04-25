import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  server = ``;
  serverSubscription: Subscription;
  userSubscription: Subscription;
  serverConnection = false;
  username = ``;
  password = ``;
  private subs = new SubSink();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subs.sink = this.authService
      .currentServer()
      .subscribe(server => (this.server = server));
    this.subs.sink = this.authService
      .currentUser()
      .subscribe(username => (this.username = username));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  updateCredentials(): void {
    this.authService.updateCredentials(this.username, this.password);
  }

  test(): void {
    this.serverConnection = false;
    const ob = this.authService.test()

    ob.then(
    response => {
      this.serverConnection = true; console.log(response);
    },
    error => this.errorHandler(error));
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
