import { Component } from '@angular/core';
import { NsComponentBase, NsFormDiConfigurator } from 'nikisoft-ng-ui';
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
