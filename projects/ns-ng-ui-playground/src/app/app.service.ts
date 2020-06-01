import { Injectable } from '@angular/core';
import { NsPageAppService } from 'ns-ng-ui';
import { AppModel } from './app.model';
import { AppNavigationService } from './service-provider/app-navigation.service';
import { AppServiceProvider } from './service-provider/app-service-provider';

@Injectable()
export class AppService extends NsPageAppService<AppModel, AppServiceProvider, AppNavigationService> {
  constructor(model: AppModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
