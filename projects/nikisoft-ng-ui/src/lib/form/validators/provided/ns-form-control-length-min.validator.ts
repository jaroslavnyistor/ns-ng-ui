import { AbstractControl, Validators } from '@angular/forms';
import { NsFormControlValidator } from '../ns-form-control.validator';

export class NsFormControlLengthMinValidator extends NsFormControlValidator {
  constructor(private _minLength: number) {
    super();
  }

  protected validate(form: AbstractControl): boolean {
    const validatorFn = Validators.minLength(this._minLength);
    const validationResult = validatorFn(form);
    return validationResult == null;
  }

  getErrorMessage(): string {
    return this.langService.getValidationIsLessThanMinLength(this._minLength);
  }
}
