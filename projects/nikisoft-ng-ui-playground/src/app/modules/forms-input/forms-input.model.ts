import { Injectable } from '@angular/core';
import { NsPageDefaultModel } from 'ns-ng-ui';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';

@Injectable()
export class FormsInputModel extends NsPageDefaultModel<AppServiceProvider, AppNavigationService> {
  constructor(serviceProvider: AppServiceProvider) {
    super(serviceProvider);
  }

  getStateKey(): string {
    return 'forms-input';
  }
}
