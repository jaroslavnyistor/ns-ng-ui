import { Injectable } from '@angular/core';
import { NsFormControlArrayModel } from 'nikisoft-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomerEntity } from '../../data/customer.entity';
import { FormsArrayBasicEntity } from '../basic/forms-array-basic.entity';
import { CustomersArrayItemModel } from './customers-array-item.model';
import { CustomersArrayService } from './customers-array.service';

@Injectable()
export class CustomersArrayModel extends NsFormControlArrayModel<
  FormsArrayBasicEntity,
  CustomersArrayService,
  CustomersArrayItemModel,
  CustomerEntity,
  AppServiceProvider,
  AppNavigationService
> {
  constructor(service: CustomersArrayService) {
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
