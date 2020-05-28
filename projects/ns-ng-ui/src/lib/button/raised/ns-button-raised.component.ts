import { Component, Input } from '@angular/core';
import { NsButtonRaisedModel } from './ns-button-raised.model';

@Component({
   selector: 'ns-button-raised',
   template: `
      <button *ngIf="model.isVisible"
              mat-raised-button
              type="submit"
              [color]="model.materialTypeText"
              [type]="model.typeText"
              [disabled]="disabled">
         {{model.text}}
      </button>
   `,
   styles: []
})
export class NsButtonRaisedComponent {
   @Input() model: NsButtonRaisedModel = new NsButtonRaisedModel('');

   get disabled(): boolean {
      return this.model.isDisabled;
   }
}
