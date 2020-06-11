import { Component } from '@angular/core';
import { NsComponentBase } from '../../../../../../nikisoft-ng-ui/src/lib/component/ns-component.base';
import { NsFormDiConfigurator } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.di-configurator';
import { FormsDateBasicModel } from './forms-date-basic.model';
import { FormsDateBasicService } from './forms-date-basic.service';

@Component({
  selector: 'forms-date-basic',
  templateUrl: './forms-date-basic.component.html',
  styles: [],
  providers: [NsFormDiConfigurator.provideService(FormsDateBasicService, FormsDateBasicModel)],
})
export class FormsDateBasicComponent extends NsComponentBase<FormsDateBasicService, FormsDateBasicModel> {
  constructor(service: FormsDateBasicService) {
    super(service);
  }
}
