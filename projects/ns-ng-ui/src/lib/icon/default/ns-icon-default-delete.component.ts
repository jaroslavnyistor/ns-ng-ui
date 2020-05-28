import { Component, Input } from '@angular/core';
import { NsIcon } from '../ns-icon.enum';

@Component({
  selector: 'ns-icon-default-delete',
  template: `
    <ns-icon-default [icon]="icon" [disabled]="disabled" [isClickable]="true" [matTooltip]="'Delete' | translate">
    </ns-icon-default>
  `,
  styles: [':host { display: inline-block; }'],
})
export class NsIconDefaultDeleteComponent {
  get icon(): NsIcon {
    return NsIcon.Action_DeleteOutline;
  }

  @Input() disabled = false;
}
