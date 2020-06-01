import { Injectable } from '@angular/core';
import { NsDashboardItemEntity, NsDashboardModel } from 'ns-ng-ui';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';

@Injectable()
export class HomeModel extends NsDashboardModel<AppServiceProvider, AppNavigationService> {
  constructor(serviceProvider: AppServiceProvider) {
    super(serviceProvider);

    this.header = 'Home';
  }

  protected getDashboardItems(): NsDashboardItemEntity[] {
    return [{ title: 'Forms', action: () => this.navService.toFormsDashboard() }];
  }
}
