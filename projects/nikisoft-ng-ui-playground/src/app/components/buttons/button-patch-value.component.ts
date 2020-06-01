import { Component, Input } from '@angular/core';
import { NsButtonRaisedModel } from 'ns-ng-ui';

@Component({
  selector: 'button-patch-value',
  template: `
    <p>
      <ns-button-raised [model]="model"> </ns-button-raised>

      {{ explanation }}
    </p>
  `,
  styles: [
    `
      ns-button-raised {
        display: inline-block;
        margin-right: 16px;
      }
    `,
  ],
})
export class ButtonPatchValueComponent {
  readonly model: NsButtonRaisedModel;

  @Input()
  explanation: string;

  constructor() {
    this.model = new NsButtonRaisedModel('Patch value');
  }
}
