import { AbstractControl, Validators } from '@angular/forms';
import { NsFormControlValidator } from '../ns-form-control.validator';

export class NsFormControlLengthMaxValidator extends NsFormControlValidator {
  constructor(private _maxLength: number) {
    super();
  }

  protected validate(form: AbstractControl): boolean {
    const validatorFn = Validators.maxLength(this._maxLength);
    const validationResult = validatorFn(form);
    return validationResult == null;
  }

  get maxLength(): number {
    return this._maxLength;
  }

  getErrorMessage(): string {
    return this.langService.getValidationMaxLengthExceed(this.maxLength);
  }
}
