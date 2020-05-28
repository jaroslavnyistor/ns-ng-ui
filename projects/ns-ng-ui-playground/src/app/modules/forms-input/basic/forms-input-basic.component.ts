import { Component } from '@angular/core';
import { NsComponentBase, NsFormDiConfigurator } from 'ns-ng-ui';
import { FormsInputBasicModel } from './forms-input-basic.model';
import { FormsInputBasicService } from './forms-input-basic.service';

@Component({
  selector: 'forms-input-basic',
  templateUrl: './forms-input-basic.component.html',
  styles: [  ],
  providers: [
     NsFormDiConfigurator.provideService(FormsInputBasicService, FormsInputBasicModel),
  ]
})
export class FormsInputBasicComponent extends NsComponentBase<FormsInputBasicService, FormsInputBasicModel> {
  constructor(service: FormsInputBasicService) {
    super(service);
  }
}
