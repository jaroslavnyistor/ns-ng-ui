import { AbstractControl, Validators } from '@angular/forms';
import { NsFormControlValidator } from '../ns-form-control.validator';

export class NsFormControlValueMaxValidator extends NsFormControlValidator {
  constructor(private _maxValue: number) {
    super();
  }

  protected validate(form: AbstractControl): boolean {
    const validatorFn = Validators.max(this._maxValue);
    const validationResult = validatorFn(form);
    return validationResult == null;
  }

  getErrorMessage(): string {
    return this.langService.getValidationMaxValueExceed(this._maxValue);
  }
}
