import { Injectable } from '@angular/core';
import { NsDashboardService } from 'nikisoft-ng-ui';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';
import { FormsDashboardModel } from './forms-dashboard.model';

@Injectable()
export class FormsDashboardService extends NsDashboardService<
  FormsDashboardModel,
  AppServiceProvider,
  AppNavigationService
> {
  constructor(model: FormsDashboardModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
