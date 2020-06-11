import { Injectable } from '@angular/core';
import { NsFormControlArrayService } from '../../../../../../nikisoft-ng-ui/src/lib/form/controls/array/ns-form-control-array.service';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomerEntity, newCustomer } from '../../data/customer.entity';
import { FormsArrayCustomersArrayItemModel } from './forms-array.customers-array-item.model';

@Injectable()
export class FormsArrayCustomersArrayService extends NsFormControlArrayService<
  FormsArrayCustomersArrayItemModel,
  CustomerEntity,
  AppServiceProvider,
  AppNavigationService
> {
  constructor(private readonly _serviceProvider: AppServiceProvider) {
    super();
  }

  createNewEntity(lastItem: CustomerEntity): CustomerEntity {
    return newCustomer();
  }

  mapEntityToFormModel(): FormsArrayCustomersArrayItemModel {
    return new FormsArrayCustomersArrayItemModel(this._serviceProvider);
  }
}
