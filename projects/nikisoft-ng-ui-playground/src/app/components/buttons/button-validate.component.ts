import { Component } from '@angular/core';
import { NsButtonType } from 'nikisoft-ng-ui';
import { NsButtonRaisedModel } from 'nikisoft-ng-ui';

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
