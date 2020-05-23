import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { nsIsNullOrEmpty } from '../../../../utils/helpers/strings/ns-helpers-strings';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlDateTimePickerConfiguration } from './ns-form-control-date-time-picker.configuration';

const FORMATS_DATE_TIME = 'll HH:mm';
const FORMATS_DATE_ONLY = 'll';
const FORMATS_TIME_ONLY = 'HH:mm';
const FORMATS_TIME = 'HH:mm';

export class NsFormControlDateTimePickerModel<TEntity>
   extends NsFormControlModel<TEntity, NsFormControl, NsFormControlDateTimePickerConfiguration> {

   private readonly _currentTime$ = new BehaviorSubject<string>(null);
   private readonly _dateTimeSelectionFormControl: NsFormControl;
   private _currentDateTime: moment.Moment;
   private readonly _currentDateTimeFormat;

   get dateTimeSelectionFormControl(): NsFormControl {
      return this._dateTimeSelectionFormControl;
   }

   get currentTime$(): Observable<string> {
      return this._currentTime$;
   }

   get canChooseDate(): boolean {
      return !this.isDisabled && (this._config.canChooseDate || true);
   }

   get canChooseTime(): boolean {
      return !this.isDisabled && (this._config.canChooseTime || true);
   }

   constructor(config: NsFormControlDateTimePickerConfiguration) {
      super(config);

      this._dateTimeSelectionFormControl = new NsFormControl(this.formControl.value);
      this.formControl.addDependsOn(this._dateTimeSelectionFormControl);

      this.defaultValue = nsNull(config.defaultValue, null);

      if (this.canChooseDate && this.canChooseTime) {
         this._currentDateTimeFormat = FORMATS_DATE_TIME;
      }
      else if (this.canChooseDate) {
         this._currentDateTimeFormat = FORMATS_DATE_ONLY;
      }
      else {
         this._currentDateTimeFormat = FORMATS_TIME_ONLY;
      }

      this.setCurrentDateTime(this.value);
   }

   protected handleValueChanged(newValue: any) {
      super.handleValueChanged(newValue);

      this.setCurrentDateTime(newValue);
   }

   private setCurrentDateTime(value: string) {
      this._currentDateTime = nsIsNullOrEmpty(value) ? null : moment(value);

      this.notifyTextChanged();
   }

   handleDateChanged(newDate: moment.Moment) {
      if (this._currentDateTime == null) {
         this._currentDateTime = newDate;
      }
      else {
         this._currentDateTime.year(newDate.year());
         this._currentDateTime.month(newDate.month());
         this._currentDateTime.date(newDate.date());
      }

      this.notifyTextChanged();
      this.updateFormControlValue();
   }

   handleTimeChanged(newTime: string) {
      const timeParts = newTime.split(':');

      if (this._currentDateTime == null) {
         this._currentDateTime = moment();
      }

      this._currentDateTime.hour(Number.parseInt(timeParts[0], 10));
      this._currentDateTime.minute(Number.parseInt(timeParts[1], 10));
      this._currentDateTime.second(0);
      this._currentDateTime.millisecond(0);

      this.notifyTextChanged();
      this.updateFormControlValue();
   }

   private notifyTextChanged() {
      let currentDateTimeText = '';
      let currentTime = '';

      if (this._currentDateTime != null) {
         currentDateTimeText = this._currentDateTime.format(this._currentDateTimeFormat);
         currentTime = this._currentDateTime.format(FORMATS_TIME);
      }

      this._dateTimeSelectionFormControl.setValue(currentDateTimeText);

      this._currentTime$.next(currentTime);
   }

   private updateFormControlValue() {
      if (this._currentDateTime != null) {
         this.formControl.setValue(this._currentDateTime.toISOString(true));
      }
   }

   //
   // protected handleStatusChanged(newStatus: any) {
   //    super.handleStatusChanged(newStatus);
   //
   //    this._dateTimeSelectionFormControl.setErrors(
   //       this.formControl.errors
   //    );
   // }
}
