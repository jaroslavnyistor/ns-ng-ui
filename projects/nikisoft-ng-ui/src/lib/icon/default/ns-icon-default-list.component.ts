import { Component, Input } from '@angular/core';
import { NsIcon } from '../ns-icon.enum';

@Component({
  selector: 'ns-icon-default-list',
  template: `
    <ns-icon-default [icon]="icon" [disabled]="disabled" [isClickable]="true" [matTooltip]="'List' | translate">
    </ns-icon-default>
  `,
  styles: [':host { display: inline-block; }'],
})
export class NsIconDefaultListComponent {
  get icon(): NsIcon {
    return NsIcon.Action_List;
  }

  @Input() disabled = false;
}
