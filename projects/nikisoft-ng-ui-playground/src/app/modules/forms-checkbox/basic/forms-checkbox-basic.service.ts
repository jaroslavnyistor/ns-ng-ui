import { Injectable } from '@angular/core';
import { NsFormService } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.service';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomerEntity } from '../../data/customer.entity';
import { FormsCheckboxBasicModel } from './forms-checkbox-basic.model';

@Injectable()
export class FormsCheckboxBasicService extends NsFormService<
  FormsCheckboxBasicModel,
  CustomerEntity,
  AppServiceProvider,
  AppNavigationService
> {
  constructor(model: FormsCheckboxBasicModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }

  makeCustomerVip() {
    this.model.patchValue({
      isVip: true,
    });
  }
}
