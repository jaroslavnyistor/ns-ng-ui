import { AbstractControl } from '@angular/forms';
import { LocalizedTextIdNikisoft, NsDateTime, nsIsNullOrEmpty } from 'ns-js-utils';
import { NsFormControlValidator } from '../ns-form-control.validator';

export class NsFormControlDateRangeValidator
   extends NsFormControlValidator {
   private readonly _startProperty: string;
   private readonly _finishProperty: string;
   private _isStartMandatory = false;
   private _isFinishMandatory = false;
   private _validateStartBeforeFinish = false;
   private _validateSameDate = false;
   private _isStartBeforeFinish = true;
   private _isSameDate = true;

   constructor(
      startProperty: string,
      finishProperty: string
   ) {
      super();

      this._startProperty = startProperty;
      this._finishProperty = finishProperty;
   }

   startIsMandatory(): this {
      this._isStartMandatory = true;
      return this;
   }

   finishIsMandatory(): this {
      this._isFinishMandatory = true;
      return this;
   }

   validateStartBeforeFinish(): this {
      this._validateStartBeforeFinish = true;
      return this;
   }

   validateSameDate(): this {
      this._validateSameDate = true;
      return this;
   }

   getErrorMessage(): string {
      if (!this._isStartBeforeFinish) {
         return this.langService.translate(LocalizedTextIdNikisoft.Validation_StartBeforeFinish);
      }

      if (!this._isSameDate) {
         return this.langService.translate(LocalizedTextIdNikisoft.Validation_StartFinishSameDate);
      }

      return null;
   }

   protected validate(form: AbstractControl): boolean {
      const finishFormControl = form.get(this._finishProperty);

      const finishString: string = finishFormControl.value;
      if (nsIsNullOrEmpty(finishString) && !this._isFinishMandatory) {
         return true;
      }

      const startFormControl = form.get(this._startProperty);
      const startString: string = startFormControl.value;

      if (nsIsNullOrEmpty(startString) && !this._isStartMandatory) {
         return true;
      }

      const start = NsDateTime.from(startString);
      const finish = NsDateTime.from(finishString);

      this._isStartBeforeFinish = !this._validateStartBeforeFinish || start.isSameOrBefore(finish);
      this._isSameDate = !this._validateSameDate || start.isSameDate(finish);

      const isValid = this._isStartBeforeFinish && this._isSameDate;
      this.invalidate(isValid, startFormControl, finishFormControl);

      return isValid;
   }
}
