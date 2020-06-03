import { Injectable } from '@angular/core';
import { NsFormService } from 'nikisoft-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { FormsDateBasicEntity } from './forms-date-basic.entity';
import { FormsDateBasicModel } from './forms-date-basic.model';

@Injectable()
export class FormsDateBasicService
  extends NsFormService<FormsDateBasicModel, FormsDateBasicEntity, AppServiceProvider, AppNavigationService> {

  constructor(model: FormsDateBasicModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
