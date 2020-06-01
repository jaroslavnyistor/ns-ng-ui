import { ValidatorFn } from '@angular/forms';
import { LocalizationLanguagesService } from 'ns-js-utils';
import { NsFormControlValidator } from './ns-form-control.validator';

export class NsFormControlValidators {
  private readonly _validators: NsFormControlValidator[] = [];
  private _langService: LocalizationLanguagesService;

  setLangService(langService: LocalizationLanguagesService) {
    this._langService = langService;
    this._validators.forEach((validator) => (validator.langService = langService));
  }

  add(validator: NsFormControlValidator): this {
    validator.langService = this._langService;

    this._validators.push(validator);
    return this;
  }

  build(): ValidatorFn[] {
    return this._validators.map((validator) => validator.validator);
  }

  addRange(validators: NsFormControlValidator[]) {
    if (validators != null) {
      validators.forEach((validator) => this.add(validator));
    }
  }
}
