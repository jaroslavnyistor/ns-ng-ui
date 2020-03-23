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
   private readonly _isReadonly: boolean;

   get dateFormControl(): NsFormControl {
      return this._dateFormControl;
   }

   get isReadonly(): boolean {
      return this._isReadonly;
   }

   get canChooseDate(): boolean {
      return !this.isDisabled && !this.isReadonly;
   }

   constructor(parent: NsFormModel<TEntity, any>,
               config: NsFormControlDatePickerConfiguration
   ) {
      super(parent, config);

      this._isReadonly = config.isReadonly || false;

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

   canClearValue(): boolean {
      return super.canClearValue() && !this._isReadonly;
   }

   open(datePicker: MatDatepicker<any>) {
      if (this.isReadonly) {
         return;
      }

      datePicker.open();
   }
}
