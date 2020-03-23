import { AbstractControl, FormControl } from '@angular/forms';
import { NsFormControlValidator } from '../../../validators/ns-form-control.validator';
import { NsFormControlAutocompleteItemEntity } from '../ns-form-control-autocomplete-item.entity';

export class NsFormControlAutocompleteRequiredValidator extends NsFormControlValidator {
   constructor(private _textFormControl: FormControl) {
      super();
   }

   protected validate(form: AbstractControl): boolean {
      const value: NsFormControlAutocompleteItemEntity = form.value;
      const isValid = value != null && value.id > 0;

      this.invalidate(isValid, this._textFormControl);
      return isValid;
   }

   getErrorMessage(): string {
      return this.langService.getValidationRequired();
   }
}
