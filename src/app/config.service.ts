import { Injectable } from '@angular/core';
import { IConfig } from 'src/config-loader';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: IConfig;
  constructor() { }
}
