import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import {HttpModule} from '@angular/http';
//import  {HTTP_PROVIDERS} from '@angular/http';

if (environment.production) {
 enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, )
  .catch(err => console.log(err));
//bootstrap(AppModule,[HttpModule]);