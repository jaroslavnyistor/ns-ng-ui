import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

export class NsFormControl extends FormControl {
   private _touchedChanges = new Subject<boolean>();

   get touchedChanges(): Observable<boolean> {
      return this._touchedChanges;
   }

   constructor(
      formState?: any,
      validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
   ) {
      super(formState, validatorOrOpts, asyncValidator);
   }

   markAsTouched(opts?: { onlySelf?: boolean }): void {
      const prevValue = this.touched;
      super.markAsTouched(opts);

      if (!prevValue) {
         this._touchedChanges.next(this.touched);
      }
   }

   markAllAsTouched(): void {
      super.markAllAsTouched();

      if (!this.touched) {
         this._touchedChanges.next(true);
      }
   }
}
