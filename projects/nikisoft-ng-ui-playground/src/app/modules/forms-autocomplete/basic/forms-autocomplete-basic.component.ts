import { Component } from '@angular/core';
import { NsComponentBase } from '../../../../../../nikisoft-ng-ui/src/lib/component/ns-component.base';
import { NsFormDiConfigurator } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.di-configurator';
import { FormsAutocompleteBasicCustomerNameModel } from './customer-name/forms-autocomplete-basic-customer-name.model';
import { FormsAutocompleteBasicModel } from './forms-autocomplete-basic.model';
import { FormsAutocompleteBasicService } from './forms-autocomplete-basic.service';

@Component({
  selector: 'forms-autocomplete-basic',
  templateUrl: './forms-autocomplete-basic.component.html',
  styleUrls: [],
  providers: [
    NsFormDiConfigurator.provideService(FormsAutocompleteBasicService, FormsAutocompleteBasicModel),
    FormsAutocompleteBasicCustomerNameModel,
  ],
})
export class FormsAutocompleteBasicComponent extends NsComponentBase<
  FormsAutocompleteBasicService,
  FormsAutocompleteBasicModel
> {
  constructor(service: FormsAutocompleteBasicService) {
    super(service);
  }
}
