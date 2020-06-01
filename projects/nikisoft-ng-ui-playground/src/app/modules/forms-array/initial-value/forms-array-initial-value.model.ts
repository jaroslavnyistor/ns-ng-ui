import { Injectable } from '@angular/core';
import { NsFormControlInputModel, NsFormModel } from 'nikisoft-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomersArrayModel } from '../customers/customers-array.model';
import { FormsArrayInitialValueEntity, newFormsArrayInitialValueEntity } from './forms-array-initial-value.entity';

@Injectable()
export class FormsArrayInitialValueModel extends NsFormModel<
  FormsArrayInitialValueEntity,
  AppServiceProvider,
  AppNavigationService
> {
  private readonly _supervisor: NsFormControlInputModel<FormsArrayInitialValueEntity>;
  private readonly _customers: CustomersArrayModel;

  get supervisor(): NsFormControlInputModel<FormsArrayInitialValueEntity> {
    return this._supervisor;
  }

  get customers(): CustomersArrayModel {
    return this._customers;
  }

  constructor(customers: CustomersArrayModel, serviceProvider: AppServiceProvider) {
    super(serviceProvider, newFormsArrayInitialValueEntity());

    this._supervisor = this.addText({
      key: 'supervisor',
      label: 'Supervisor',
      isRequired: true,
      autofocus: true,
    });

    this._customers = this.add(customers);
  }

  handlePatch() {
    this.patchValue({
      supervisor: 'Supervisor',
    });
  }
}
