import { Injectable } from '@angular/core';
import { NsDashboardService } from '../../../../../nikisoft-ng-ui/src/lib/dasboard/ns-dashboard.service';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';
import { HomeModel } from './home.model';

@Injectable()
export class HomeService extends NsDashboardService<HomeModel, AppServiceProvider, AppNavigationService> {
  constructor(model: HomeModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
