import { Injectable } from '@angular/core';
import { NsPageService } from 'ns-ng-ui/lib/page/base/ns-page.service';
import { AppModel } from './app.model';
import { AppNavigationService } from './service-provider/app-navigation.service';
import { AppServiceProvider } from './service-provider/app-service-provider';

@Injectable()
export class AppService extends NsPageService<AppModel, AppServiceProvider, AppNavigationService> {
   constructor(model: AppModel, serviceProvider: AppServiceProvider) {
      super(model, serviceProvider);
   }
}
