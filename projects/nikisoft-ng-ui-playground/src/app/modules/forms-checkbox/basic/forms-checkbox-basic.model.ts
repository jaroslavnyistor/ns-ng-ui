import { Injectable } from '@angular/core';
import { NsFormControlCheckboxModel } from '../../../../../../nikisoft-ng-ui/src/lib/form/controls/checkbox/ns-form-control-checkbox.model';
import { NsFormModel } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.model';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomerEntity, newCustomer } from '../../data/customer.entity';

@Injectable()
export class FormsCheckboxBasicModel extends NsFormModel<CustomerEntity, AppServiceProvider, AppNavigationService> {
  private readonly _isVip: NsFormControlCheckboxModel<CustomerEntity>;

  get isVip(): NsFormControlCheckboxModel<CustomerEntity> {
    return this._isVip;
  }

  constructor(serviceProvider: AppServiceProvider) {
    super(serviceProvider, newCustomer());

    this._isVip = this.addCheckBox({
      key: 'isVip',
      label: 'Is VIP customer?',
      isRequired: true,
    });
  }
}
