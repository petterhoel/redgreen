import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

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
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.serverSubscription = this.authService
      .currentServer()
      .subscribe(server => (this.server = server));
    this.userSubscription = this.authService
      .currentUser()
      .subscribe(username => (this.username = username));
  }

  ngOnDestroy(): void {
    if (this.serverSubscription) {
      this.serverSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  updateCredentials(): void {
    this.authService.updateCredentials(this.username, this.password);
  }

  test(): void {
    this.serverConnection = false;
    this.authService.test().subscribe(
      response => {
        this.serverConnection = true;
        console.log(response);
      },
      error => {
        this.serverConnection = false;
        console.error(error);
      }
    );
  }

  updateServer(): void {
    this.authService.updateServer(this.server);
  }
}
