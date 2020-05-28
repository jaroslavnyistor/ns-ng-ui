import { Component } from '@angular/core';
import { NsComponentBase, NsFormDiConfigurator } from 'ns-ng-ui';
import { CustomersArrayModel } from '../customers/customers-array.model';
import { CustomersArrayService } from '../customers/customers-array.service';
import { FormsArrayInitialValueModel } from './forms-array-initial-value.model';
import { FormsArrayInitialValueService } from './forms-array-initial-value.service';

@Component({
   selector: 'forms-array-initial-value',
   templateUrl: './forms-array-initial-value.component.html',
   styles: [],
   providers: [
      NsFormDiConfigurator.provideService(FormsArrayInitialValueService, FormsArrayInitialValueModel),
      CustomersArrayModel,
      CustomersArrayService
   ]
})
export class FormsArrayInitialValueComponent
   extends NsComponentBase<FormsArrayInitialValueService, FormsArrayInitialValueModel> {

   constructor(service: FormsArrayInitialValueService) {
      super(service);
   }
}
