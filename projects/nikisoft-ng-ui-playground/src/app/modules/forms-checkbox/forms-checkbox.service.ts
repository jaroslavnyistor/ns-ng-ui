import { Injectable } from '@angular/core';
import { NsPageStandardService } from '../../../../../nikisoft-ng-ui/src/lib/page/standard/ns-page-standard.service';
import { AppNavigationService } from '../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../service-provider/app-service-provider';
import { FormsCheckboxModel } from './forms-checkbox.model';

@Injectable()
export class FormsCheckboxService extends NsPageStandardService<
  FormsCheckboxModel,
  AppServiceProvider,
  AppNavigationService
> {
  constructor(model: FormsCheckboxModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }
}
