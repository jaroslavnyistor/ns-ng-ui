import { Injectable } from '@angular/core';
import { NsPageAppToolbarNavItemGroupEntity } from 'nikisoft-ng-ui';
import { NsPageAppModel } from 'nikisoft-ng-ui';
import { Observable, of } from 'rxjs';
import { AppNavigationService } from './service-provider/app-navigation.service';
import { AppServiceProvider } from './service-provider/app-service-provider';

@Injectable()
export class AppModel extends NsPageAppModel<AppServiceProvider, AppNavigationService> {
  private readonly _isNavigationVisible$ = of(true);

  get isNavigationVisible$(): Observable<boolean> {
    return this._isNavigationVisible$;
  }

  get pageTitle(): string {
    return 'NikiSoft Web Frontend Playground Ui';
  }

  constructor(serviceProvider: AppServiceProvider) {
    super(serviceProvider);
  }

  protected getApplicationNavigationItems(): NsPageAppToolbarNavItemGroupEntity[] {
    return [
      {
        title: 'Forms',
        items: [
          { title: 'Dashboard', action: () => this.navService.toFormsDashboard() },
          { title: 'Array', action: () => this.navService.toFormsArray() },
          { title: 'Autocomplete', action: () => this.navService.toFormsAutocomplete() },
          { title: 'Checkbox', action: () => this.navService.toFormsCheckbox() },
          { title: 'Date', action: () => this.navService.toFormsDate() },
          { title: 'Input', action: () => this.navService.toFormsInput() },
        ],
      },
    ];
  }
}
