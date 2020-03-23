import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { nsIsNullOrEmpty } from '../../../../utils/helpers/strings/ns-helpers-strings';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlDateTimePickerConfiguration } from './ns-form-control-date-time-picker.configuration';

const FORMATS_DATE_TIME = 'll HH:mm';
const FORMATS_DATE_ONLY = 'll';
const FORMATS_TIME_ONLY = 'HH:mm';
const FORMATS_TIME = 'HH:mm';

export class NsFormControlDateTimePickerModel<TEntity>
   extends NsFormControlModel<TEntity, NsFormControlDateTimePickerModel<TEntity>, NsFormControl> {

   private readonly _currentTime$ = new BehaviorSubject<string>(null);
   private readonly _dateTimeSelectionFormControl: NsFormControl;
   private _isReadonly = false;
   private _currentDateTime: moment.Moment;
   private readonly _canChooseDate = true;
   private readonly _canChooseTime = true;
   private readonly _currentDateTimeFormat;

   get dateTimeSelectionFormControl(): NsFormControl {
      return this._dateTimeSelectionFormControl;
   }

   get currentTime$(): Observable<string> {
      return this._currentTime$;
   }

   get isReadonly(): boolean {
      return this._isReadonly;
   }

   set isReadonly(value: boolean) {
      this._isReadonly = value;
   }

   get canChooseDate(): boolean {
      return !this.isDisabled && !this.isReadonly && this._canChooseDate;
   }

   get canChooseTime(): boolean {
      return !this.isDisabled && !this.isReadonly && this._canChooseTime;
   }

   constructor(parent: NsFormModel<TEntity, any>,
               config: NsFormControlDateTimePickerConfiguration
   ) {
      super(parent, config);

      this._dateTimeSelectionFormControl = new NsFormControl(this.formControl.value);

      this.defaultValue = nsNull(config.defaultValue, null);

      this.addSubscription(
         this.formControl.touchedChanges
         .subscribe({
            next: () => this._dateTimeSelectionFormControl.markAsTouched()
         })
      );

      this._isReadonly = config.isReadonly || false;
      this._canChooseDate = config.canChooseDate || true;
      this._canChooseTime = config.canChooseTime || true;

      if (this._canChooseDate && this._canChooseTime) {
         this._currentDateTimeFormat = FORMATS_DATE_TIME;
      } else if (this._canChooseDate) {
         this._currentDateTimeFormat = FORMATS_DATE_ONLY;
      } else {
         this._currentDateTimeFormat = FORMATS_TIME_ONLY;
      }

      this.setCurrentDateTime(this.value);
   }

   onInit() {
      super.onInit();

      this._dateTimeSelectionFormControl.setValidators(this.validatorsFn);
   }

   protected handleValueChanged(newValue: any) {
      super.handleValueChanged(newValue);

      this.setCurrentDateTime(newValue);
   }

   private setCurrentDateTime(value: string) {
      this._currentDateTime = nsIsNullOrEmpty(value) ? null : moment(value);

      this.notifyTextChanged();
   }

   canClearValue(): boolean {
      return super.canClearValue() && !this._isReadonly;
   }

   handleDateChanged(newDate: moment.Moment) {
      if (this._currentDateTime == null) {
         this._currentDateTime = newDate;
      } else {
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

   protected handleStatusChanged(newStatus: any) {
      super.handleStatusChanged(newStatus);

      this._dateTimeSelectionFormControl.setErrors(
         this.formControl.errors
      );
   }
}
