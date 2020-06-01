import { Component, Input } from '@angular/core';
import { NsFormControlMultiSelectModel } from './ns-form-control-multi-select.model';
import { NsIcon } from '../../../icon/ns-icon.enum';

@Component({
  selector: 'ns-form-control-autocomplete',
  templateUrl: './ns-form-control-multi-select.component.html',
  styleUrls: ['./ns-form-control-multi-select.component.sass'],
})
export class NsFormControlMultiSelectComponent {
  @Input() model: NsFormControlMultiSelectModel<any, any, any>;

  NsIcon = NsIcon;
}
