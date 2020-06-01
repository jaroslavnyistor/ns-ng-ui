import { Component, Input, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { provideNsDateTimePickersProviders } from '../date-time/ns-form-control-date-time-picker.formats';
import { NsFormControlDatePickerModel } from './ns-form-control-date-picker.model';

@Component({
  selector: 'ns-form-control-date-picker',
  templateUrl: './ns-form-control-date-picker.component.html',
  styleUrls: ['./ns-form-control-date-picker.component.sass'],
  providers: provideNsDateTimePickersProviders(),
})
export class NsFormControlDatePickerComponent {
  NsIcon = NsIcon;
  @Input() model: NsFormControlDatePickerModel<any>;

  @ViewChild('dp', { read: MatDatepicker, static: true }) datePicker: MatDatepicker<any>;
}
