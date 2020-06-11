import { Injectable } from '@angular/core';
import { NsFormModel } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.model';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { FormsArrayCustomersArrayModel } from '../customers/forms-array.customers-array.model';
import { CanDeleteCustomersModel } from './can-delete-customers.model';
import { FormsArrayBasicEntity, newFormsArrayBasicEntity } from './forms-array-basic.entity';

@Injectable()
export class FormsArrayBasicModel extends NsFormModel<FormsArrayBasicEntity, AppServiceProvider, AppNavigationService> {
  private readonly _customers: FormsArrayCustomersArrayModel;
  private readonly _canDeleteCustomers: CanDeleteCustomersModel;

  get customers(): FormsArrayCustomersArrayModel {
    return this._customers;
  }

  get canDeleteCustomers(): CanDeleteCustomersModel {
    return this._canDeleteCustomers;
  }

  constructor(
    serviceProvider: AppServiceProvider,
    customers: FormsArrayCustomersArrayModel,
    canDeleteCustomersModel: CanDeleteCustomersModel,
  ) {
    super(serviceProvider, newFormsArrayBasicEntity());

    this._customers = this.add(customers);

    this._canDeleteCustomers = this.add(canDeleteCustomersModel);
  }
}
