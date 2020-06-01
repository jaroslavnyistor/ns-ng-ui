import { Component } from '@angular/core';
import { NsComponentBase, NsFormDiConfigurator } from 'nikisoft-ng-ui';
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
