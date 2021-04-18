import { HttpClient } from '@angular/common/http';
import { ConfigService } from './app/config.service';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

export function load(http: HttpClient, configService: ConfigService): (() => Promise<string>) {
  return (): Promise<string> => {
    return new Promise<string>(async (resolve: (a: string) => void, reject: (a: string) => void): Promise<void> => {
      try {
        const configFromFile = await http.get<IConfig>('./config.json').toPromise();
        configService.config = configFromFile;
        if (configFromFile.sentry.use) {
          const dsn = configFromFile.sentry.dsn;
          const release = `buildscreen@${configFromFile.version.commitRef}`;

          Sentry.init(
            { 
              dsn, 
              release, 
              integrations: [
                new Integrations.BrowserTracing({
                  tracingOrigins: ["localhost", "https://redgreen.app"],
                  routingInstrumentation: Sentry.routingInstrumentation,
            
                })
              ],
              tracesSampleRate: 1
            });
        }
        resolve('Config read success');
      } catch (error) {
        reject('Config read failed');
      }
    });
  };
}

export interface IConfig {
  sentry: ISentryConfig;
  version: IVersionConfig;
}

export interface ISentryConfig {
  dsn: string;
  use: boolean;
}

export interface IVersionConfig {
  commitRef: string;
}
