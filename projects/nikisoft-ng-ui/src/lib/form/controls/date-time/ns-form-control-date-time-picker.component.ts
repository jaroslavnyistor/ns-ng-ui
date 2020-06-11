import { Component, Input, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { NsSubscriptionBase } from 'nikisoft-utils';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { nsFormControlTimePickerTheme } from '../time/ns-form-control-time-picker.theme';
import { getNsDateTimePickersProviders } from './ns-form-control-date-time-picker.formats';
import { NsFormControlDateTimePickerModel } from './ns-form-control-date-time-picker.model';

@Component({
  selector: 'ns-form-control-date-time-picker',
  templateUrl: './ns-form-control-date-time-picker.component.html',
  styleUrls: ['./ns-form-control-date-time-picker.component.sass'],
  providers: getNsDateTimePickersProviders(),
})
export class NsFormControlDateTimePickerComponent extends NsSubscriptionBase {
  private _datePicker: MatDatepicker<any>;

  NsIcon = NsIcon;
  theme = nsFormControlTimePickerTheme;

  @Input() model: NsFormControlDateTimePickerModel<any>;

  @ViewChild('dp', { read: MatDatepicker, static: true }) get datePicker(): MatDatepicker<any> {
    return this._datePicker;
  }

  set datePicker(value: MatDatepicker<any>) {
    this._datePicker = value;

    this.subscribeTo(this._datePicker._selectedChanged, {
      next: (newDate) => this.model.handleDateChanged(newDate),
    });
  }
}
