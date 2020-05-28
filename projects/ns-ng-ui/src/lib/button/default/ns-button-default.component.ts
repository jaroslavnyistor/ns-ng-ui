import { Component, Input } from '@angular/core';
import { NsButtonDefaultModel } from './ns-button-default.model';

@Component({
  selector: 'ns-button-default',
  template: `
    <button
      *ngIf="model.isVisible"
      mat-stroked-button
      [color]="model.materialTypeText"
      [type]="model.materialType"
      [disabled]="disabled"
    >
      {{ model.text }}
    </button>
  `,
  styles: [],
})
export class NsButtonDefaultComponent {
  @Input() model: NsButtonDefaultModel = new NsButtonDefaultModel('');

  get disabled(): boolean {
    return this.model.isDisabled;
  }
}
