import { ValidatorFn } from '@angular/forms';
import { LocalizationLanguagesService } from '../../../utils/localization/localization-languages.service';
import { NsFormControlValidator } from './ns-form-control.validator';

export class NsFormControlValidators {
   private readonly _validators: Array<NsFormControlValidator> = [];
   private readonly _langService: LocalizationLanguagesService;

   constructor(langService: LocalizationLanguagesService) {
      this._langService = langService;
   }

   add(validator: NsFormControlValidator): this {
      validator.langService = this._langService;

      this._validators.push(validator);
      return this;
   }

   build(): ValidatorFn[] {
      return this._validators.map(validator => validator.validator);
   }

   addRange(validators: NsFormControlValidator[]) {
      if (validators != null) {
         validators.forEach(validator => this.add(validator));
      }
   }
}
