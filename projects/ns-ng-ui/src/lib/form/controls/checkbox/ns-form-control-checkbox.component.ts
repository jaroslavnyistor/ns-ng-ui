import { Component, Input } from '@angular/core';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { NsFormControlCheckboxModel } from './ns-form-control-checkbox.model';

@Component({
  selector: 'ns-form-control-checkbox',
  templateUrl: './ns-form-control-checkbox.component.html',
  styleUrls: ['./ns-form-control-checkbox.component.sass'],
})
export class NsFormControlCheckboxComponent {
  NsIcon = NsIcon;

  @Input() model: NsFormControlCheckboxModel<any>;
}
