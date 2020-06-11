import { Injectable } from '@angular/core';
import { NsFormControlCheckboxModel } from '../../../../../../nikisoft-ng-ui/src/lib/form/controls/checkbox/ns-form-control-checkbox.model';
import { FormsArrayCustomersArrayModel } from '../customers/forms-array-customers-array.model';
import { FormsArrayBasicEntity } from './forms-array-basic.entity';

@Injectable()
export class FormsArrayCanDeleteCustomersModel extends NsFormControlCheckboxModel<FormsArrayBasicEntity> {
  constructor(private readonly _customers: FormsArrayCustomersArrayModel) {
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
