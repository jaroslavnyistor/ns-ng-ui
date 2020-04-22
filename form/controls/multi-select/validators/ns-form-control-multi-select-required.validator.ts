import { AbstractControl, FormControl } from '@angular/forms';
import { NsFormControlValidator } from '../../../validators/ns-form-control.validator';
import { NsFormControlMultiSelectItemEntity } from '../ns-form-control-multi-select-item.entity';

export class NsFormControlMultiSelectRequiredValidator extends NsFormControlValidator {
   constructor(private _textFormControl: FormControl) {
      super();
   }

   protected validate(form: AbstractControl): boolean {
      const value: NsFormControlMultiSelectItemEntity = form.value;
      const isValid = value != null && value.id > 0;

      this.invalidate(isValid, this._textFormControl);
      return isValid;
   }

   getErrorMessage(): string {
      return this.langService.getValidationRequired();
   }
}
