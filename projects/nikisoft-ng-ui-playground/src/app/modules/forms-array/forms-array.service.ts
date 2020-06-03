import { Injectable } from '@angular/core';
import { NsPageStandardService } from 'nikisoft-ng-ui';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';
import { FormsArrayModel } from './forms-array.model';

@Injectable()
export class FormsArrayService extends NsPageStandardService<FormsArrayModel, AppServiceProvider, AppNavigationService> {
  constructor(model: FormsArrayModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
