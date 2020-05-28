import { Component } from '@angular/core';
import { NsComponentBase, NsPageDefaultDiConfigurator } from "ns-ng-ui";
import { FormsCheckboxModel } from './forms-checkbox.model';
import { FormsCheckboxService } from './forms-checkbox.service';

@Component({
   selector: 'forms-checkbox',
   templateUrl: './forms-checkbox.component.html',
   styles: [],
   providers: [
      NsPageDefaultDiConfigurator.provideService(FormsCheckboxService, FormsCheckboxModel),
   ]
})
export class FormsCheckboxComponent extends NsComponentBase<FormsCheckboxService, FormsCheckboxModel> {

   constructor(service: FormsCheckboxService) {
      super(service);
   }
}
