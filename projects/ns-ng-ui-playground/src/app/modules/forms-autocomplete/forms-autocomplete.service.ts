import { Injectable } from '@angular/core';
import { NsPageDefaultService } from 'ns-ng-ui';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';
import { FormsAutocompleteModel } from './forms-autocomplete.model';

@Injectable()
export class FormsAutocompleteService
   extends NsPageDefaultService<FormsAutocompleteModel, AppServiceProvider, AppNavigationService> {

   constructor(model: FormsAutocompleteModel, serviceProvider: AppServiceProvider) {
      super(model, serviceProvider);
   }
}
