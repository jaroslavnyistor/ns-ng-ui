import { MatDatepicker } from '@angular/material';
import * as moment from 'moment';
import { NsDate } from '../../../../utils/dates/ns-date';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlDatePickerConfiguration } from './ns-form-control-date-picker.configuration';

export class NsFormControlDatePickerModel<TEntity>
   extends NsFormControlModel<TEntity, NsFormControlDatePickerModel<TEntity>, NsFormControl> {
   private readonly _dateFormControl: NsFormControl;
   private _minDate: Date;
   private _maxDate: Date;

   get dateFormControl(): NsFormControl {
      return this._dateFormControl;
   }

   get canChooseDate(): boolean {
      return !this.isDisabled;
   }

   get minDate(): Date {
      return this._minDate;
   }

   get maxDate(): Date {
      return this._maxDate;
   }

   constructor(parent: NsFormModel<TEntity, any>,
               config: NsFormControlDatePickerConfiguration
   ) {
      super(parent, config);

      this._dateFormControl = new NsFormControl(this.formControl.value);

      this.defaultValue = nsNull(config.defaultValue, null);

      this.addSubscription(
         this._dateFormControl.valueChanges
         .subscribe({
            next: newValue => this.handleDateFormControlValueChanged(newValue)
         })
      );

      this.addSubscription(
         this.formControl.touchedChanges
         .subscribe({
            next: () => this._dateFormControl.markAsTouched()
         })
      );
   }

   onInit() {
      super.onInit();

      this._dateFormControl.setValidators(this.validatorsFn);
   }

   private handleDateFormControlValueChanged(newValue: moment.Moment) {
      let dateStringValue = null;
      if (newValue != null) {
         if (newValue.toISOString) {
            dateStringValue = NsDate.from(newValue.toISOString(false)).toString();
         } else {
            dateStringValue = newValue;
         }
      }

      if (this.value === dateStringValue) {
         return;
      }

      this.setValue(dateStringValue);
   }

   protected handleValueChanged(newValue: any) {
      super.handleValueChanged(newValue);

      const dateFormControlValue = this._dateFormControl.value;
      const dateStringValue = dateFormControlValue == null
                              ? null
                              : NsDate.from(dateFormControlValue).toString();

      if (newValue === dateStringValue) {
         return;
      }

      this._dateFormControl.setValue(newValue);
   }

   open(datePicker: MatDatepicker<any>) {
      if (this.isDisabled) {
         return;
      }

      datePicker.open();
   }

   setMinDate(date: NsDate) {
      this._minDate = NsDate.toJsDate(date);
   }

   setMaxDate(date: NsDate) {
      this._maxDate = NsDate.toJsDate(date);
   }
}
