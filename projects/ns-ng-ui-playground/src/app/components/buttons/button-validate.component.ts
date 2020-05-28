import { Component } from '@angular/core';
import { NsButtonType } from 'ns-ng-ui/lib/button/ns-button-type.enum';
import { NsButtonRaisedModel } from 'ns-ng-ui/lib/button/raised/ns-button-raised.model';

@Component({
  selector: 'button-validate',
  template: ` <ns-button-raised [model]="model"> </ns-button-raised> `,
  styles: [],
})
export class ButtonValidateComponent {
  readonly model: NsButtonRaisedModel;

  constructor() {
    this.model = new NsButtonRaisedModel('Validate');
    this.model.type = NsButtonType.Submit;
  }
}
