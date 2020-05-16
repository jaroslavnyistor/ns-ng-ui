import { Component, Input } from '@angular/core';
import { NsIcon } from '../ns-icon.enum';

@Component({
   selector: 'ns-icon-default-pick-date',
   template: `
      <ns-icon-default [icon]="icon"
                       [disabled]="disabled"
                       [isClickable]="true"
                       [matTooltip]="'PickDate' | translate">
      </ns-icon-default>
   `,
   styles: [
      ':host { display: inline-block; }'
   ]
})
export class NsIconDefaultPickDateComponent {
   get icon(): NsIcon {
      return NsIcon.Action_CalendarToday;
   }

   @Input() disabled = false;
}
