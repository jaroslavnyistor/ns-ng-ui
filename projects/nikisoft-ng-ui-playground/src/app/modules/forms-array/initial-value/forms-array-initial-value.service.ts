import { Injectable } from '@angular/core';
import { NsFormService } from 'nikisoft-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomersService } from '../../data/customers.service';
import { FormsArrayInitialValueEntity } from './forms-array-initial-value.entity';
import { FormsArrayInitialValueModel } from './forms-array-initial-value.model';

@Injectable()
export class FormsArrayInitialValueService extends NsFormService<
  FormsArrayInitialValueModel,
  FormsArrayInitialValueEntity,
  AppServiceProvider,
  AppNavigationService
> {
  constructor(
    model: FormsArrayInitialValueModel,
    serviceProvider: AppServiceProvider,
    private readonly _customersService: CustomersService,
  ) {
    super(model, serviceProvider);
  }

  onInit() {
    super.onInit();

    this.subscribeTo(this._customersService.load(), {
      next: (customers) =>
        this.model.setInitialEntity({
          supervisor: '',
          customers,
        }),
    });
  }
}
