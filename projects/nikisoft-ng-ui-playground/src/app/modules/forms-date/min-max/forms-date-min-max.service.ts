import { Injectable } from '@angular/core';
import { NsFormService } from 'nikisoft-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { FormsDateMinMaxEntity } from './forms-date-min-max.entity';
import { FormsDateMinMaxModel } from './forms-date-min-max.model';

@Injectable()
export class FormsDateMinMaxService extends NsFormService<
  FormsDateMinMaxModel,
  FormsDateMinMaxEntity,
  AppServiceProvider,
  AppNavigationService
> {
  constructor(model: FormsDateMinMaxModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
