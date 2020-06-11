import { FormControl } from '@angular/forms';
import { NsObject, NsString } from 'nikisoft-utils';
import { NsFormControlValueMaxValidator } from '../../validators/provided/ns-form-control-value-max.validator';
import { NsFormControlValueMinValidator } from '../../validators/provided/ns-form-control-value-min.validator';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlNumberConfiguration } from './ns-form-control-number.configuration';

const defaultStep = 1;

export class NsFormControlNumberModel<TEntity> extends NsFormControlModel<
  TEntity,
  NsFormControl,
  NsFormControlNumberConfiguration
> {
  private _numberTextFormControl: NsFormControl;

  get numberTextFormControl(): FormControl {
    return this._numberTextFormControl;
  }

  get minValue(): number {
    return this._config.minValue;
  }

  get maxValue(): number {
    return this._config.maxValue;
  }

  get step(): number {
    return this._config.step || defaultStep;
  }

  constructor(config: NsFormControlNumberConfiguration) {
    super(config);

    if (this.minValue != null) {
      this.addValidator(new NsFormControlValueMinValidator(this.minValue));
    }

    if (this.maxValue != null) {
      this.addValidator(new NsFormControlValueMaxValidator(this.maxValue));
    }

    this.defaultValue = NsObject.nullOrDefaultValue(config.defaultValue, null);
  }

  setFormControl(formControl: NsFormControl) {
    super.setFormControl(formControl);

    this._numberTextFormControl = new NsFormControl(this.formControl.value);
    this.formControl.addDependsOn(this._numberTextFormControl);

    this.processNumberTextFormControlValueChanges();
  }

  private processNumberTextFormControlValueChanges() {
    this.subscribeTo(this._numberTextFormControl.valueChanges, {
      next: (newValue) => {
        const numberValue = NsString.toNumber(newValue);

        if (this.value === numberValue) {
          return;
        }

        this.setValue(numberValue);
      },
    });
  }

  protected handleValueChanged(newValue: any) {
    super.handleValueChanged(newValue);

    const numberValue = NsString.toNumber(this._numberTextFormControl.value);
    if (newValue === numberValue) {
      return;
    }

    this._numberTextFormControl.setValue(newValue);
  }
}
