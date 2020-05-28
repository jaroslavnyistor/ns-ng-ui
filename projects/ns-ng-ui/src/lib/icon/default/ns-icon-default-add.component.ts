import { Component, Input } from '@angular/core';
import { NsIcon } from '../ns-icon.enum';

@Component({
  selector: 'ns-icon-default-add',
  template: `
    <ns-icon-default [icon]="icon" [disabled]="disabled" [isClickable]="true" [matTooltip]="'Add' | translate">
    </ns-icon-default>
  `,
  styles: [':host { display: inline-block; }'],
})
export class NsIconDefaultAddComponent {
  get icon(): NsIcon {
    return NsIcon.Content_Add;
  }

  @Input() disabled = false;
}
