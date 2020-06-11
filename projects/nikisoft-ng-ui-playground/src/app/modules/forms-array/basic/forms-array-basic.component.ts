import { Component } from '@angular/core';
import { NsComponentBase } from '../../../../../../nikisoft-ng-ui/src/lib/component/ns-component.base';
import { NsFormDiConfigurator } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.di-configurator';
import { FormsArrayCustomersArrayModel } from '../customers/forms-array.customers-array.model';
import { FormsArrayCustomersArrayService } from '../customers/forms-array.customers-array.service';
import { FormsArrayCanDeleteCustomersModel } from './forms-array.can-delete-customers.model';
import { FormsArrayBasicModel } from './forms-array-basic.model';
import { FormsArrayBasicService } from './forms-array-basic.service';

@Component({
  selector: 'forms-array-basic',
  templateUrl: './forms-array-basic.component.html',
  styles: [],
  providers: [
    NsFormDiConfigurator.provideService(FormsArrayBasicService, FormsArrayBasicModel),
    FormsArrayCustomersArrayModel,
    FormsArrayCustomersArrayService,
    FormsArrayCanDeleteCustomersModel,
  ],
})
export class FormsArrayBasicComponent extends NsComponentBase<FormsArrayBasicService, FormsArrayBasicModel> {
  constructor(service: FormsArrayBasicService) {
    super(service);
  }
}
