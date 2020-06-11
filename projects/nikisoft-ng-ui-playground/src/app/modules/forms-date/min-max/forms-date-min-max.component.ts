import { Component } from '@angular/core';
import { NsComponentBase } from '../../../../../../nikisoft-ng-ui/src/lib/component/ns-component.base';
import { NsFormDiConfigurator } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.di-configurator';
import { FormsDateMinMaxModel } from './forms-date-min-max.model';
import { FormsDateMinMaxService } from './forms-date-min-max.service';

@Component({
  selector: 'forms-date-min-max',
  templateUrl: './forms-date-min-max.component.html',
  styles: [],
  providers: [NsFormDiConfigurator.provideService(FormsDateMinMaxService, FormsDateMinMaxModel)],
})
export class FormsDateMinMaxComponent extends NsComponentBase<FormsDateMinMaxService, FormsDateMinMaxModel> {
  constructor(service: FormsDateMinMaxService) {
    super(service);
  }
}
