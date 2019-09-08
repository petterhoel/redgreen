import { Injectable } from '@angular/core';
import { ServerCredentials } from './server-credentials';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private readonly LOCAL_STORAGE_KEY: string = 'server-credentials';
  private readonly emptyCredentials: ServerCredentials = { server: '', token: '' }

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
    return credentials;
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
