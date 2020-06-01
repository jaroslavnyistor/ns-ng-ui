import { Injectable } from '@angular/core';
import { NsPageDefaultService } from 'nikisoft-ng-ui';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';
import { FormsInputModel } from './forms-input.model';

@Injectable()
export class FormsInputService extends NsPageDefaultService<FormsInputModel, AppServiceProvider, AppNavigationService> {
  constructor(model: FormsInputModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
