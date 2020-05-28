import { Injectable } from '@angular/core';
import { NsFormModel } from 'ns-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { FormsAutocompleteBasicCustomerNameModel } from './customer-name/forms-autocomplete-basic.customer-name.model';
import { FormsAutocompleteBasicEntity, newFormsAutocompleteBasicEntity } from './forms-autocomplete-basic.entity';

@Injectable()
export class FormsAutocompleteBasicModel
   extends NsFormModel<FormsAutocompleteBasicEntity, AppServiceProvider, AppNavigationService> {
   private readonly _customerName: FormsAutocompleteBasicCustomerNameModel;

   get customerName(): FormsAutocompleteBasicCustomerNameModel {
      return this._customerName;
   }

   constructor(
      serviceProvider: AppServiceProvider,
      customerName: FormsAutocompleteBasicCustomerNameModel
   ) {
      super(serviceProvider, newFormsAutocompleteBasicEntity());

      this._customerName = this.add(customerName);
   }
}


