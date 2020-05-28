import { Injectable } from '@angular/core';
import { NsFormControlArrayService } from 'ns-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomerEntity, newCustomer } from '../../data/customer.entity';
import { CustomersArrayItemModel } from './customers-array-item.model';

@Injectable()
export class CustomersArrayService
   extends NsFormControlArrayService<CustomersArrayItemModel, CustomerEntity,
      AppServiceProvider, AppNavigationService> {

   constructor(private readonly _serviceProvider: AppServiceProvider) {
      super();
   }

   createNewEntity(lastItem: CustomerEntity): CustomerEntity {
      return newCustomer();
   }

   mapEntityToFormModel(): CustomersArrayItemModel {
      return new CustomersArrayItemModel(this._serviceProvider);
   }
}
