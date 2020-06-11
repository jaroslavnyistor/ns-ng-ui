import { MatDatepicker } from '@angular/material/datepicker';
import { NsArray, NsDate, NsObject } from 'nikisoft-utils';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlDatePickerConfiguration } from './ns-form-control-date-picker.configuration';

export class NsFormControlDatePickerModel<TEntity> extends NsFormControlModel<
  TEntity,
  NsFormControl,
  NsFormControlDatePickerConfiguration
> {
  private _dateFormControl: NsFormControl;
  private _currentNsDate: NsDate;
  private _minDate: Date;
  private _minDate$: Observable<NsDate>;
  private _minMaxDateSubscription: Subscription;
  private _maxDate: Date;
  private _maxDate$: Observable<NsDate>;

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

  constructor(config: NsFormControlDatePickerConfiguration) {
    super(config);

    this.defaultValue = NsObject.nullOrDefaultValue(config.defaultValue, null);
  }

  onDestroy() {
    this.unsubscribeMinMaxDate$();
  }

  private unsubscribeMinMaxDate$() {
    if (this._minMaxDateSubscription != null) {
      this._minMaxDateSubscription.unsubscribe();
      this._minMaxDateSubscription = null;
    }
  }

  setFormControl(formControl: NsFormControl) {
    super.setFormControl(formControl);

    this._dateFormControl = new NsFormControl(this.formControl.value);
    this.formControl.addDependsOn(this._dateFormControl);

    this.processDateFormControlValueChanges();
  }

  private processDateFormControlValueChanges() {
    this.subscribeTo(this._dateFormControl.valueChanges, {
      next: (newValue) => {
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
      },
    });
  }

  protected handleValueChanged(newValue: any) {
    super.handleValueChanged(newValue);

    const dateFormControlValue = NsDate.fromAsString(this._dateFormControl.value);
    this._currentNsDate = NsDate.from(dateFormControlValue);

    if (newValue === dateFormControlValue) {
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

  setMinDate(date: string): this {
    this.setMinDate$(of(date));

    return this;
  }

  setMinDate$(obs$: Observable<string>): this {
    this._minDate$ = obs$.pipe(map(value => NsDate.from(value)));

    this.createMinMaxDate$();

    return this;
  }

  setMaxDate(date: string): this {
    this.setMaxDate$(of(date));

    return this;
  }

  setMaxDate$(obs$: Observable<string>): this {
    this._maxDate$ = obs$.pipe(map(value => NsDate.from(value)));

    this.createMinMaxDate$();

    return this;
  }

  private createMinMaxDate$() {
    this.unsubscribeMinMaxDate$();

    const defaultValue: Observable<NsDate> = of(null);
    const obs$ = NsArray.nullOrDefaultValue([this._minDate$, this._maxDate$], defaultValue);

    this._minMaxDateSubscription = combineLatest(obs$)
      .subscribe({
        next: value => this.handleMinMaxChanged(value)
      })
  }

  private handleMinMaxChanged([minNsDate, maxNsDate]: NsDate[]) {
    this._minDate = NsDate.toJsDate(minNsDate);
    this._maxDate = NsDate.toJsDate(maxNsDate);

    if (this._currentNsDate != null) {
      const isBetween = this._currentNsDate.isBetween(minNsDate, maxNsDate);

      const value = isBetween ? this._currentNsDate.toString() : null;
      this.patchValue(value);
    }
  }
}
