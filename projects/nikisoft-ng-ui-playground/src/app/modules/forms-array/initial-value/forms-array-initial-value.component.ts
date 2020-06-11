import { Component } from '@angular/core';
import { NsComponentBase } from '../../../../../../nikisoft-ng-ui/src/lib/component/ns-component.base';
import { NsFormDiConfigurator } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.di-configurator';
import { FormsArrayCustomersArrayModel } from '../customers/forms-array-customers-array.model';
import { FormsArrayCustomersArrayService } from '../customers/forms-array-customers-array.service';
import { FormsArrayInitialValueModel } from './forms-array-initial-value.model';
import { FormsArrayInitialValueService } from './forms-array-initial-value.service';

@Component({
  selector: 'forms-array-initial-value',
  templateUrl: './forms-array-initial-value.component.html',
  styles: [],
  providers: [
    NsFormDiConfigurator.provideService(FormsArrayInitialValueService, FormsArrayInitialValueModel),
    FormsArrayCustomersArrayModel,
    FormsArrayCustomersArrayService,
  ],
})
export class FormsArrayInitialValueComponent extends NsComponentBase<
  FormsArrayInitialValueService,
  FormsArrayInitialValueModel
> {
  constructor(service: FormsArrayInitialValueService) {
    super(service);
  }
}
