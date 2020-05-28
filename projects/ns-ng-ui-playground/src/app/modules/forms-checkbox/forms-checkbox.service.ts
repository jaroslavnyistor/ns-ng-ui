import { Injectable } from '@angular/core';
import { NsPageDefaultService } from 'ns-ng-ui';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';
import { FormsCheckboxModel } from './forms-checkbox.model';

@Injectable()
export class FormsCheckboxService
  extends NsPageDefaultService<FormsCheckboxModel, AppServiceProvider, AppNavigationService> {

  constructor(model: FormsCheckboxModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
