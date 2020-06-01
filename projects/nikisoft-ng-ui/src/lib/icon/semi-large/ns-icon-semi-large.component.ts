import { Component, Input } from '@angular/core';
import { NsIconComponent } from '../ns-icon.component';
import { NsIcon } from '../ns-icon.enum';

@Component({
  selector: 'ns-icon-semi-large',
  template: `
    <ns-icon
      size="40"
      [icon]="icon"
      [keepSpace]="keepSpace"
      [disabled]="disabled"
      [isClickable]="isClickable"
      [inverse]="inverse"
      [tooltip]="tooltip"
      [isFocusable]="isFocusable"
    >
      <ng-content></ng-content>
    </ns-icon>
  `,
  styles: [':host { display: inline-block; }'],
})
export class NsIconSemiLargeComponent extends NsIconComponent {
  @Input() icon: NsIcon;
  @Input() keepSpace = false;
  @Input() disabled: boolean;
  @Input() isClickable: boolean;
  @Input() inverse = false;
  @Input() tooltip: string;
  @Input() isFocusable = true;
}
