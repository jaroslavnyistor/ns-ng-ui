import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';

export class NsFormControl extends FormControl {
  private _touchedChanges = new Subject<boolean>();
  private readonly _dependsOn: AbstractControl[] = [];

  get touchedChanges(): Observable<boolean> {
    return this._touchedChanges;
  }

  constructor(
    formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }

  setValidators(newValidator: ValidatorFn | ValidatorFn[] | null) {
    super.setValidators(newValidator);

    this._dependsOn.forEach((control) => control.setValidators(newValidator));
  }

  setAsyncValidators(newValidator: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super.setAsyncValidators(newValidator);

    this._dependsOn.forEach((control) => control.setAsyncValidators(newValidator));
  }

  setErrors(errors: ValidationErrors | null, opts?: { emitEvent?: boolean }) {
    super.setErrors(errors, opts);

    this._dependsOn.forEach((control) => control.setErrors(errors));
  }

  addDependsOn(control: AbstractControl): this {
    this._dependsOn.push(control);
    return this;
  }

  markAsTouched(opts?: { onlySelf?: boolean }): void {
    const prevValue = this.touched;
    super.markAsTouched(opts);

    if (!prevValue) {
      this._dependsOn.forEach((control) => control.markAsTouched());
      this._touchedChanges.next(this.touched);
    }
  }

  markAllAsTouched(): void {
    super.markAllAsTouched();

    if (!this.touched) {
      this._dependsOn.forEach((control) => control.markAsTouched());
      this._touchedChanges.next(true);
    }
  }
}
