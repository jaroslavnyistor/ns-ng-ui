import { Injectable } from '@angular/core';
import { NsFormControlArrayModel } from '../../../../../../nikisoft-ng-ui/src/lib/form/controls/array/ns-form-control-array.model';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomerEntity } from '../../data/customer.entity';
import { FormsArrayBasicEntity } from '../basic/forms-array-basic.entity';
import { FormsArrayCustomersArrayItemModel } from './forms-array-customers-array-item.model';
import { FormsArrayCustomersArrayService } from './forms-array-customers-array.service';

@Injectable()
export class FormsArrayCustomersArrayModel extends NsFormControlArrayModel<
  FormsArrayBasicEntity,
  FormsArrayCustomersArrayService,
  FormsArrayCustomersArrayItemModel,
  CustomerEntity,
  AppServiceProvider,
  AppNavigationService
> {
  constructor(service: FormsArrayCustomersArrayService) {
    super({
      key: 'customers',
      label: 'Customers',
      service,
      isRequired: true,
    });
  }

  protected getNoItemsMessage(): string {
    return 'No customers added.';
  }
}
