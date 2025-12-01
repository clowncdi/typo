import { BaseApp } from './BaseApp';
import { App1 } from '../apps/App1';
import { App2 } from '../apps/App2';
import { App3 } from '../apps/App3';
import { App4 } from '../apps/App4';
import { App5 } from '../apps/App5';
import { App6 } from '../apps/App6';
import { App7 } from '../apps/App7';
import { App8 } from '../apps/App8';
import { App9 } from '../apps/App9';
import { App10 } from '../apps/App10';

export type AppType = 'app1' | 'app2' | 'app3' | 'app4' | 'app5' | 'app6' | 'app7' | 'app8' | 'app9' | 'app10';
export type AppInstance = BaseApp | App10;

export class AppFactory {
  private static apps: Map<AppType, AppInstance> = new Map();

  static create(appType: AppType): AppInstance {
    if (this.apps.has(appType)) {
      return this.apps.get(appType)!;
    }

    let app: AppInstance;

    switch (appType) {
      case 'app1':
        app = new App1();
        break;
      case 'app2':
        app = new App2();
        break;
      case 'app3':
        app = new App3();
        break;
      case 'app4':
        app = new App4();
        break;
      case 'app5':
        app = new App5();
        break;
      case 'app6':
        app = new App6();
        break;
      case 'app7':
        app = new App7();
        break;
      case 'app8':
        app = new App8();
        break;
      case 'app9':
        app = new App9();
        break;
      case 'app10':
        app = new App10();
        break;
      default:
        throw new Error(`Unknown app type: ${appType}`);
    }

    this.apps.set(appType, app);
    return app;
  }

  static createAll(): Map<AppType, AppInstance> {
    const appTypes: AppType[] = ['app1', 'app2', 'app3', 'app4', 'app5', 'app6', 'app7', 'app8', 'app9', 'app10'];
    appTypes.forEach(type => this.create(type));
    return this.apps;
  }
}
