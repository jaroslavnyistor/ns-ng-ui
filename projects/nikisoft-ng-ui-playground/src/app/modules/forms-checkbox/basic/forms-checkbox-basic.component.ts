import { Component } from '@angular/core';
import { NsComponentBase } from '../../../../../../nikisoft-ng-ui/src/lib/component/ns-component.base';
import { NsFormDiConfigurator } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.di-configurator';
import { FormsCheckboxBasicModel } from './forms-checkbox-basic.model';
import { FormsCheckboxBasicService } from './forms-checkbox-basic.service';

@Component({
  selector: 'forms-checkbox-basic',
  templateUrl: './forms-checkbox-basic.component.html',
  styles: [],
  providers: [NsFormDiConfigurator.provideService(FormsCheckboxBasicService, FormsCheckboxBasicModel)],
})
export class FormsCheckboxBasicComponent extends NsComponentBase<FormsCheckboxBasicService, FormsCheckboxBasicModel> {
  constructor(service: FormsCheckboxBasicService) {
    super(service);
  }
}
