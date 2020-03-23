import { Component, Input } from '@angular/core';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { NsFormControlTimePickerModel } from './ns-form-control-time-picker.model';
import { nsFormControlTimePickerTheme } from './ns-form-control-time-picker.theme';

@Component({
   selector: 'ns-form-control-time-picker',
   templateUrl: './ns-form-control-time-picker.component.html',
   styleUrls: ['./ns-form-control-time-picker.component.sass']
})
export class NsFormControlTimePickerComponent {
   NsIcon = NsIcon;
   theme = nsFormControlTimePickerTheme;

   @Input() model: NsFormControlTimePickerModel<any>;
}
