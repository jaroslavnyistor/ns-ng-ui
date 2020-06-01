import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LocalizationLanguagesService } from 'nikisoft-utils';

export abstract class NsFormControlValidator {
  private readonly _validator: ValidatorFn;
  private _langService: LocalizationLanguagesService;

  get langService(): LocalizationLanguagesService {
    return this._langService;
  }

  set langService(value: LocalizationLanguagesService) {
    this._langService = value;
  }

  get validator(): ValidatorFn {
    return this._validator;
  }

  protected constructor() {
    this._validator = (form) => {
      const isValid = this.validate(form);
      return this.createValidationError(isValid);
    };
  }

  protected abstract validate(form: AbstractControl): boolean;

  abstract getErrorMessage(): string;

  protected invalidate(isValid: boolean, ...formControls: AbstractControl[]) {
    formControls.forEach((formControl) => {
      if (isValid !== formControl.valid) {
        const errors: ValidationErrors = this.createValidationError(isValid);
        formControl.setErrors(errors);
      }
    });
  }

  protected createValidationError(isValid: boolean): ValidationErrors {
    let result = null;
    if (!isValid) {
      result = {
        error: this.getErrorMessage(),
      };
    }

    return result;
  }
}
