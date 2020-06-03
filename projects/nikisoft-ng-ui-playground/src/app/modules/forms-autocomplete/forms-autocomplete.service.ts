import { Injectable } from '@angular/core';
import { NsPageStandardService } from 'nikisoft-ng-ui';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';
import { FormsAutocompleteModel } from './forms-autocomplete.model';

@Injectable()
export class FormsAutocompleteService extends NsPageStandardService<
  FormsAutocompleteModel,
  AppServiceProvider,
  AppNavigationService
> {
  constructor(model: FormsAutocompleteModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
