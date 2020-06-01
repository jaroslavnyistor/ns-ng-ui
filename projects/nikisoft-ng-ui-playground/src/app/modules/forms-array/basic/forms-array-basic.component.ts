import { Component } from '@angular/core';
import { NsComponentBase, NsFormDiConfigurator } from 'ns-ng-ui';
import { CustomersArrayModel } from '../customers/customers-array.model';
import { CustomersArrayService } from '../customers/customers-array.service';
import { CanDeleteCustomersModel } from './can-delete-customers.model';
import { FormsArrayBasicModel } from './forms-array-basic.model';
import { FormsArrayBasicService } from './forms-array-basic.service';

@Component({
  selector: 'forms-array-basic',
  templateUrl: './forms-array-basic.component.html',
  styles: [],
  providers: [
    NsFormDiConfigurator.provideService(FormsArrayBasicService, FormsArrayBasicModel),
    CustomersArrayModel,
    CustomersArrayService,
    CanDeleteCustomersModel,
  ],
})
export class FormsArrayBasicComponent extends NsComponentBase<FormsArrayBasicService, FormsArrayBasicModel> {
  constructor(service: FormsArrayBasicService) {
    super(service);
  }
}
