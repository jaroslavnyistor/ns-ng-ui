import { Injectable } from '@angular/core';
import { NsPageStandardService } from 'nikisoft-ng-ui';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';
import { FormsDateModel } from './forms-date.model';

@Injectable()
export class FormsDateService extends NsPageStandardService<FormsDateModel, AppServiceProvider, AppNavigationService> {
  constructor(model: FormsDateModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
