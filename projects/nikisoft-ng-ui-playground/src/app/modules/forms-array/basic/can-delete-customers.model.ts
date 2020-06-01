import { Injectable } from '@angular/core';
import { NsFormControlCheckboxModel } from 'ns-ng-ui';
import { CustomersArrayModel } from '../customers/customers-array.model';
import { FormsArrayBasicEntity } from './forms-array-basic.entity';

@Injectable()
export class CanDeleteCustomersModel extends NsFormControlCheckboxModel<FormsArrayBasicEntity> {
  constructor(private readonly _customers: CustomersArrayModel) {
    super({
      key: 'canDeleteCustomers',
      label: 'Can delete customers?',
    });
  }

  protected handleValueChanged(newValue: any) {
    super.handleValueChanged(newValue);

    this._customers.canDeleteItems = newValue;
  }
}
