import { Component, Input, ViewChild } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { LocalizationLanguagesService } from '../../../../utils/localization/localization-languages.service';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { NsFormControlDatePickerModel } from './ns-form-control-date-picker.model';

export const MY_FORMATS = {
   parse: {
      dateInput: 'LL',
   },
   display: {
      dateInput: 'LL',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
   },
};

@Component({
   selector: 'ns-form-control-date-picker',
   templateUrl: './ns-form-control-date-picker.component.html',
   styleUrls: ['./ns-form-control-date-picker.component.sass'],
   providers: [
      { provide: MAT_DATE_LOCALE, useFactory: () => LocalizationLanguagesService.resolveLanguage() },
      // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
      // `MatMomentDateModule` in your applications root module. We provide it at the component level
      // here, due to limitations of our example generation script.
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
   ],
})
export class NsFormControlDatePickerComponent {
   NsIcon = NsIcon;
   @Input() model: NsFormControlDatePickerModel<any>;

   @ViewChild('dp', { read: MatDatepicker, static: true }) datePicker: MatDatepicker<any>;
}
