import { AbstractControl, Validators } from '@angular/forms';
import { NsFormControlValidator } from '../ns-form-control.validator';

export class NsFormControlRequiredValidator extends NsFormControlValidator {
  constructor() {
    super();
  }

  protected validate(form: AbstractControl): boolean {
    const result = Validators.required(form);
    return result == null;
  }

  getErrorMessage(): string {
    return this.langService.getValidationRequired();
  }
}
