import { Injectable } from '@angular/core';
import { NsFormService } from 'ns-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomerEntity } from '../../data/customer.entity';
import { FormsInputDependsOnModel } from './forms-input-depends-on.model';

@Injectable()
export class FormsInputDependsOnService extends NsFormService<
  FormsInputDependsOnModel,
  CustomerEntity,
  AppServiceProvider,
  AppNavigationService
> {
  constructor(model: FormsInputDependsOnModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
