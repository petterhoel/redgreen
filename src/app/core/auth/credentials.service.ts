import { Injectable } from '@angular/core';
import { ServerCredentials } from './server-credentials';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private readonly LOCAL_STORAGE_KEY: string = 'server-credentials';
  private readonly emptyCredentials: ServerCredentials = { server: 'https://', token: '' };

  setCredentials(credentials: ServerCredentials): void {
    const credParsed = JSON.stringify(credentials);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, credParsed);
  }

  getCredentials(): ServerCredentials {
    const credFromStorage = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (!credFromStorage) {
      return this.emptyCredentials;
    }
    const credentials = JSON.parse(credFromStorage) as ServerCredentials;
    if (!credentials) {
      return this.emptyCredentials;
    }
    if (!credentials.server.trim()){
      credentials.server = this.emptyCredentials.server;
    }
    return credentials;
  }

  clearCredentials(): void {
    const emptyCred = JSON.stringify(this.emptyCredentials);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, emptyCred);
  }

  getAuthToken(): string {
    const credFromStorage = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (!credFromStorage) {
      return '';
    }
    const credentials = JSON.parse(credFromStorage) as ServerCredentials;
    if (credentials && credentials.token) {
      return credentials.token;
    }
    return '';
  }
}
