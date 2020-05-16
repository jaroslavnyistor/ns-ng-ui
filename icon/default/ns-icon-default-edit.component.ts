import { Component, Input } from '@angular/core';
import { NsIcon } from '../ns-icon.enum';

@Component({
   selector: 'ns-icon-default-edit',
   template: `
      <ns-icon-default [icon]="icon"
                       [disabled]="disabled"
                       [isClickable]="true"
                       [matTooltip]="'Edit' | translate">
      </ns-icon-default>
   `,
   styles: [
      ':host { display: inline-block; }'
   ]
})
export class NsIconDefaultEditComponent {
   get icon(): NsIcon {
      return NsIcon.Content_Create;
   }

   @Input() disabled = false;
}
