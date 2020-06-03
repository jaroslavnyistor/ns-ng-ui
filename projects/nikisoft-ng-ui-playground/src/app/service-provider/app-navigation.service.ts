import { Injectable } from '@angular/core';
import { NsRouterService } from 'nikisoft-utils';
import { NsStorageService } from 'nikisoft-utils';
import { NsNavigationService } from 'nikisoft-utils';
import { formsArrayRoute } from '../modules/forms-array/forms-array.routes';
import { formsCheckboxRoute } from '../modules/forms-checkbox/forms-checkbox.routes';
import { formsDashboardRoute } from '../modules/forms-dashboard/forms-dashboard.routes';
import { formsAutocompleteRoute } from '../modules/forms-autocomplete/forms-autocomplete.routes';
import { formsDateRoute } from '../modules/forms-date/forms-date.routes';
import { formsInputRoute } from '../modules/forms-input/forms-input.routes';

@Injectable({
  providedIn: 'root',
})
export class AppNavigationService extends NsNavigationService {
  constructor(routerService: NsRouterService, storageService: NsStorageService) {
    super(routerService, storageService);
  }

  toFormsDashboard() {
    return this.navigate(formsDashboardRoute);
  }

  toFormsArray() {
    return this.navigate(formsArrayRoute);
  }

  toFormsAutocomplete() {
    return this.navigate(formsAutocompleteRoute);
  }

  toFormsCheckbox() {
    return this.navigate(formsCheckboxRoute);
  }

  toFormsDate() {
    return this.navigate(formsDateRoute);
  }

  toFormsInput() {
    return this.navigate(formsInputRoute);
  }
}
