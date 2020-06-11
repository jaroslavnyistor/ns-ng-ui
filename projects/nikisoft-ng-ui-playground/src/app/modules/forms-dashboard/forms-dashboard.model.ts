import { Injectable } from '@angular/core';
import { NsDashboardItemEntity } from '../../../../../nikisoft-ng-ui/src/lib/dasboard/ns-dashboard-item.entity';
import { NsDashboardModel } from '../../../../../nikisoft-ng-ui/src/lib/dasboard/ns-dashboard.model';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';

@Injectable()
export class FormsDashboardModel extends NsDashboardModel<AppServiceProvider, AppNavigationService> {
  constructor(serviceProvider: AppServiceProvider) {
    super(serviceProvider);

    this.header = 'Forms';
  }

  protected getDashboardItems(): NsDashboardItemEntity[] {
    return [
      { title: 'Array', action: () => this.navService.toFormsArray() },
      { title: 'Autocomplete', action: () => this.navService.toFormsAutocomplete() },
      { title: 'Checkbox', action: () => this.navService.toFormsCheckbox() },
      { title: 'Date', action: () => this.navService.toFormsDate() },
      { title: 'Input', action: () => this.navService.toFormsInput() },
    ];
  }
}
