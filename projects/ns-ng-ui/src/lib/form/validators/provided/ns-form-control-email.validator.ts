import { AbstractControl, Validators } from '@angular/forms';
import { NsFormControlValidator } from '../ns-form-control.validator';

export class NsFormControlEmailValidator extends NsFormControlValidator {
   constructor() {
      super();
   }

   protected validate(form: AbstractControl): boolean {
      return Validators.email(form) == null;
   }

   getErrorMessage(): string {
      return this.langService.getValidationEmailIncorrectFormat();
   }
}
