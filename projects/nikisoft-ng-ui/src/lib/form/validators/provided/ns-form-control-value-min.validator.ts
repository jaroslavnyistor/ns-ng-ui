import { AbstractControl, Validators } from '@angular/forms';
import { NsFormControlValidator } from '../ns-form-control.validator';

export class NsFormControlValueMinValidator extends NsFormControlValidator {
  constructor(private _minValue: number) {
    super();
  }

  protected validate(form: AbstractControl): boolean {
    const validatorFn = Validators.min(this._minValue);
    const validationResult = validatorFn(form);
    return validationResult == null;
  }

  getErrorMessage(): string {
    return this.langService.getValidationIsLessThanMinValue(this._minValue);
  }
}
