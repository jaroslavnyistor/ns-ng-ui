import { Injectable } from '@angular/core';
import { NsFormService } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.service';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { FormsAutocompleteBasicEntity } from './forms-autocomplete-basic.entity';
import { FormsAutocompleteBasicModel } from './forms-autocomplete-basic.model';

@Injectable()
export class FormsAutocompleteBasicService extends NsFormService<
  FormsAutocompleteBasicModel,
  FormsAutocompleteBasicEntity,
  AppServiceProvider,
  AppNavigationService
> {
  constructor(model: FormsAutocompleteBasicModel, serviceProvider: AppServiceProvider) {
    super(model, serviceProvider);
  }

  onInit() {
    super.onInit();

    this.model.setInitialEntity({
      id: 1,
      customerName: '',
    });
  }
}
