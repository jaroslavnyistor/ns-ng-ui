import { Component } from '@angular/core';
import { NsComponentBase } from '../../../../../nikisoft-ng-ui/src/lib/component/ns-component.base';
import { NsPageStandardDiConfigurator } from '../../../../../nikisoft-ng-ui/src/lib/page/standard/ns-page-standard.di-configurator';
import { FormsCheckboxModel } from './forms-checkbox.model';
import { FormsCheckboxService } from './forms-checkbox.service';

@Component({
  selector: 'forms-checkbox',
  templateUrl: './forms-checkbox.component.html',
  styles: [],
  providers: [NsPageStandardDiConfigurator.provideService(FormsCheckboxService, FormsCheckboxModel)],
})
export class FormsCheckboxComponent extends NsComponentBase<FormsCheckboxService, FormsCheckboxModel> {
  constructor(service: FormsCheckboxService) {
    super(service);
  }
}
