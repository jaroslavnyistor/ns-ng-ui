import { Injectable } from '@angular/core';
import { NsFormControlInputModel } from '../../../../../../nikisoft-ng-ui/src/lib/form/controls/input/ns-form-control-input.model';
import { NsFormModel } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.model';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { FormsArrayCustomersArrayModel } from '../customers/forms-array-customers-array.model';
import { FormsArrayInitialValueEntity, newFormsArrayInitialValueEntity } from './forms-array-initial-value.entity';

@Injectable()
export class FormsArrayInitialValueModel extends NsFormModel<
  FormsArrayInitialValueEntity,
  AppServiceProvider,
  AppNavigationService
> {
  private readonly _supervisor: NsFormControlInputModel<FormsArrayInitialValueEntity>;
  private readonly _customers: FormsArrayCustomersArrayModel;

  get supervisor(): NsFormControlInputModel<FormsArrayInitialValueEntity> {
    return this._supervisor;
  }

  get customers(): FormsArrayCustomersArrayModel {
    return this._customers;
  }

  constructor(customers: FormsArrayCustomersArrayModel, serviceProvider: AppServiceProvider) {
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
