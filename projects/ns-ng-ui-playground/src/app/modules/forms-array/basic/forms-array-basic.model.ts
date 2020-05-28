import { Injectable } from '@angular/core';
import { NsFormModel } from 'ns-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomersArrayModel } from '../customers/customers-array.model';
import { CanDeleteCustomersModel } from './can-delete-customers.model';
import { FormsArrayBasicEntity, newFormsArrayBasicEntity } from './forms-array-basic.entity';

@Injectable()
export class FormsArrayBasicModel extends NsFormModel<FormsArrayBasicEntity, AppServiceProvider, AppNavigationService> {
  private readonly _customers: CustomersArrayModel;
  private readonly _canDeleteCustomers: CanDeleteCustomersModel;

  get customers(): CustomersArrayModel {
    return this._customers;
  }

  get canDeleteCustomers(): CanDeleteCustomersModel {
    return this._canDeleteCustomers;
  }

  constructor(
    serviceProvider: AppServiceProvider,
    customers: CustomersArrayModel,
    canDeleteCustomersModel: CanDeleteCustomersModel,
  ) {
    super(serviceProvider, newFormsArrayBasicEntity());

    this._customers = this.add(customers);

    this._canDeleteCustomers = this.add(canDeleteCustomersModel);
  }
}
