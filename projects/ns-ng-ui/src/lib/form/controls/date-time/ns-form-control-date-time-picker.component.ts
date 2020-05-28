import { Component, Input, ViewChild } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { LocalizationLanguagesService } from '../../../../utils/localization/localization-languages.service';
import { NsSubscriptionBase } from '../../../../utils/subscription/ns-subscription.base';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { MY_FORMATS } from '../date/ns-form-control-date-picker.component';
import { nsFormControlTimePickerTheme } from '../time/ns-form-control-time-picker.theme';
import { NsFormControlDateTimePickerModel } from './ns-form-control-date-time-picker.model';

@Component({
   selector: 'ns-form-control-date-time-picker',
   templateUrl: './ns-form-control-date-time-picker.component.html',
   styleUrls: ['./ns-form-control-date-time-picker.component.sass'],
   providers: [
      { provide: MAT_DATE_LOCALE, useFactory: () => LocalizationLanguagesService.resolveLanguage() },
      // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
      // `MatMomentDateModule` in your applications root module. We provide it at the component level
      // here, due to limitations of our example generation script.
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
   ],
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

      this.subscribeTo(
         this._datePicker._selectedChanged,
         {
            next: newDate => this.model.handleDateChanged(newDate)
         }
      );
   }
}
