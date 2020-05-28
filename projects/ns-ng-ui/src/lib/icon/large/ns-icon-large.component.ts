import { Component, Input } from '@angular/core';
import { NsIcon } from '../ns-icon.enum';

@Component({
   selector: 'ns-icon-large',
   template: `
      <ns-icon size="48"
               [icon]="icon"
               [keepSpace]="keepSpace"
               [disabled]="disabled"
               [isClickable]="isClickable"
               [inverse]="inverse"
               [tooltip]="tooltip"
               [isFocusable]="isFocusable">
         <ng-content></ng-content>
      </ns-icon>
   `,
   styles: [
      ':host { display: inline-block; }'
   ]
})
export class NsIconLargeComponent {
   @Input() icon: NsIcon;
   @Input() keepSpace = false;
   @Input() disabled: boolean;
   @Input() isClickable: boolean;
   @Input() inverse = false;
   @Input() tooltip: string;
   @Input() isFocusable = true;
}
