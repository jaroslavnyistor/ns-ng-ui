import { Component } from '@angular/core';
import { NsComponentBase } from '../../../../../../nikisoft-ng-ui/src/lib/component/ns-component.base';
import { NsFormDiConfigurator } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.di-configurator';
import { FormsInputDependsOnModel } from './forms-input-depends-on.model';
import { FormsInputDependsOnService } from './forms-input-depends-on.service';

@Component({
  selector: 'forms-input-depends-on',
  templateUrl: './forms-input-depends-on.component.html',
  styles: [],
  providers: [NsFormDiConfigurator.provideService(FormsInputDependsOnService, FormsInputDependsOnModel)],
})
export class FormsInputDependsOnComponent extends NsComponentBase<
  FormsInputDependsOnService,
  FormsInputDependsOnModel
> {
  constructor(service: FormsInputDependsOnService) {
    super(service);
  }
}
