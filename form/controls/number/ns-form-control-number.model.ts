import { FormControl } from '@angular/forms';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { nsFormatFloatNumber } from '../../../../utils/helpers/numbers/ns-helpers-numbers';
import { nsStringToNumber } from '../../../../utils/helpers/strings/ns-helpers-strings';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControlValueMaxValidator } from '../../validators/provided/ns-form-control-value-max.validator';
import { NsFormControlValueMinValidator } from '../../validators/provided/ns-form-control-value-min.validator';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlNumberConfiguration } from './ns-form-control-number.configuration';

const defaultStep = 1;

export class NsFormControlNumberModel<TEntity>
   extends NsFormControlModel<TEntity, NsFormControlNumberModel<TEntity>, NsFormControl> {

   private readonly _numberTextFormControl: NsFormControl;
   private readonly _minValue: number;
   private readonly _maxValue: number;
   private readonly _step: number;

   get numberTextFormControl(): FormControl {
      return this._numberTextFormControl;
   }

   get minValue(): number {
      return this._minValue;
   }

   get maxValue(): number {
      return this._maxValue;
   }

   get step(): number {
      return this._step;
   }

   constructor(parent: NsFormModel<TEntity, any>, config: NsFormControlNumberConfiguration) {
      super(parent, config);

      this._minValue = config.minValue;

      if (this._minValue != null) {
         this.addValidator(new NsFormControlValueMinValidator(this._minValue));
      }

      this._maxValue = config.maxValue;
      if (this._maxValue != null) {
         this.addValidator(new NsFormControlValueMaxValidator(this._maxValue));
      }

      this._step = config.step || defaultStep;

      this.defaultValue = nsNull(config.defaultValue, null);

      this._numberTextFormControl = new NsFormControl(this.formControl.value);

      this.addSubscription(
         this._numberTextFormControl.valueChanges
         .subscribe({
            next: newValue => this.handleNumberTextFormControlValueChanged(newValue)
         })
      );

      this.addSubscription(
         this.formControl.touchedChanges
         .subscribe({
            next: () => this._numberTextFormControl.markAsTouched()
         })
      );
   }

   onInit() {
      super.onInit();

      this._numberTextFormControl.setValidators(this.validatorsFn);
   }

   private handleNumberTextFormControlValueChanged(newValue: string) {
      const numberValue = nsStringToNumber(newValue);

      if (this.value === numberValue) {
         return;
      }

      this.setValue(numberValue);
   }

   protected handleValueChanged(newValue: any) {
      super.handleValueChanged(newValue);

      const numberValue = nsStringToNumber(this._numberTextFormControl.value);
      if (newValue === numberValue) {
         return;
      }

      const newValueString = nsFormatFloatNumber(newValue);
      this._numberTextFormControl.setValue(newValueString);
   }

   protected handleStatusChanged(newStatus: any) {
      super.handleStatusChanged(newStatus);

      this._numberTextFormControl.setErrors(
         this.formControl.errors
      );
   }
}
