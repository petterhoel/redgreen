import { Injectable } from '@angular/core';
import { CredentialsService } from '../core/auth/credentials.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseDataService {
  get serverUrl(): string {
    return this.credentialService.getCredentials().server;
  }
  constructor(private credentialService: CredentialsService, protected http: HttpClient) { }
}
