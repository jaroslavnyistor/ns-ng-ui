import { ValidatorFn } from '@angular/forms';
import {
  LocalizationLanguagesService,
  nsArrayIsEmpty,
  nsIsNotNullOrEmpty,
  nsObjectHasValue,
  NsSubscriptionModel,
} from 'nikisoft-utils';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { NsFormControlValidator } from '../validators/ns-form-control.validator';
import { NsFormControlValidators } from '../validators/ns-form-control.validators';
import { NsFormControlRequiredValidator } from '../validators/provided/ns-form-control-required.validator';
import { NsFormArray } from './array/ns-form-array';
import { NsFormGroup } from './group/ns-form-group';
import { NsFormControl } from './ns-form-control';
import { NsFormControlConfiguration } from './ns-form-control.configuration';
import { NsFormControlDefinition } from './ns-form-control.definition';

export abstract class NsFormControlModel<
  TEntity,
  TFormControl extends NsFormControl | NsFormGroup | NsFormArray,
  TConfiguration extends NsFormControlConfiguration
> extends NsSubscriptionModel implements NsFormControlDefinition {
  protected readonly _config: TConfiguration;
  private _formControl: TFormControl;
  private _langService: LocalizationLanguagesService;
  private _label: string;
  private _hint: string;
  private _isDisabled: boolean;
  private _hasValue = false;
  private _dependingValues: any[] = [];
  private readonly _validators: NsFormControlValidators;
  private _validatorsFn: ValidatorFn[];
  private _errorMessage$: Observable<string>;
  private _valueChanges$: Observable<any>;
  private _statusChanges$: BehaviorSubject<string>;
  private _currentStatus: string;

  protected get langService(): LocalizationLanguagesService {
    return this._langService;
  }

  get formControl(): TFormControl {
    return this._formControl;
  }

  get key(): string {
    return this._config.key;
  }

  get label(): string {
    return this._label;
  }

  get isHintVisible(): boolean {
    return nsIsNotNullOrEmpty(this._hint);
  }

  get hint(): string {
    return this._hint;
  }

  get isRequired(): boolean {
    return this._config.isRequired === true;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  set isDisabled(value: boolean) {
    if (this._isDisabled !== value) {
      this._isDisabled = value;

      this.updateDisabledState();
    }
  }

  protected get hasDependingValues(): boolean {
    return this._dependingValues.length > 0;
  }

  protected get dependingValues(): any[] {
    return this._dependingValues;
  }

  get value(): any {
    return this._formControl.value;
  }

  get hasValue(): boolean {
    return this._hasValue;
  }

  protected get defaultValue(): any {
    return this._config.defaultValue;
  }

  protected set defaultValue(value: any) {
    this._config.defaultValue = value;
  }

  get errorMessage$(): Observable<string> {
    return this._errorMessage$;
  }

  get valueChanges$(): Observable<any> {
    return this._valueChanges$;
  }

  get status(): any {
    return this.formControl.status;
  }

  get statusChanges$(): Observable<any> {
    return this._statusChanges$;
  }

  protected constructor(config: TConfiguration) {
    super();

    this._config = config;
    this._validators = new NsFormControlValidators();
    this._validators.addRange(this._config.validators);

    if (this._config.isRequired === true) {
      this._validators.add(new NsFormControlRequiredValidator());
    }
  }

  protected addValidator(validator: NsFormControlValidator) {
    this._validators.add(validator);
  }

  protected updateDisabledState() {
    if (this._isDisabled) {
      if (!this.formControl.disabled) {
        this.formControl.disable({ emitEvent: false });
      }
    } else if (this.formControl.disabled) {
      this.formControl.enable({ emitEvent: false });
    }
  }

  canClearValue(): boolean {
    return this.hasValue && !this.isDisabled;
  }

  clearValue() {
    this.setValue(this.defaultValue);
  }

  setFormControl(formControl: TFormControl) {
    this._formControl = formControl;
  }

  setLangService(langService: LocalizationLanguagesService) {
    this._langService = langService;
    this._validators.setLangService(langService);
  }

  onValuePatch(value: any) {}

  onInit() {
    super.onInit();

    this.isDisabled = this._config.isDisabled === true;

    this.initValidators();

    this.fixLabel();

    this.updateDisabledState();

    this.setErrorMessage$();

    this.setValueChanges$();

    this.setDependsOn$();
  }

  private initValidators() {
    this._validatorsFn = this._validators.build();
    this.formControl.setValidators(this._validatorsFn);
  }

  private fixLabel() {
    if (this._config.labelId == null && this._config.label == null) {
      throw new Error('labelId or label must be provided.');
    }

    this._label = this._config.label;

    if (this._config.labelId != null) {
      this._label = this._langService.translate(this._config.labelId);
    }

    if (this.isRequired) {
      this._label = `${this._label}*`;
    }

    this._hint = null;
    if (nsIsNotNullOrEmpty(this._config.hint)) {
      this._hint = this._config.hint;
    } else if (this._config.hintId != null) {
      this._hint = this._langService.translate(this._config.hintId);
    }
  }

  private setErrorMessage$() {
    this._errorMessage$ = this.formControl.statusChanges.pipe(
      map(() => {
        const errors = this.formControl.errors;

        return errors != null && nsIsNotNullOrEmpty(errors.error) ? errors.error : '';
      }),
    );
  }

  private setValueChanges$() {
    this._valueChanges$ = this.formControl.valueChanges.pipe(
      filter((value) => {
        const formGroup = this.formControl.parent;
        const prevValue = formGroup.value[this.key];
        return value !== prevValue;
      }),
    );

    this.subscribeTo(this.valueChanges$, {
      next: (newValue) => this.handleValueChanged(newValue),
    });
  }

  protected handleValueChanged(newValue: any) {
    this._hasValue = this.resolveHasValue(newValue);
  }

  protected resolveHasValue(newValue: any): boolean {
    return nsObjectHasValue(newValue);
  }

  private setStatusChanges$() {
    this._statusChanges$ = new BehaviorSubject<any>(this.formControl.status);

    const obs$ = this.formControl.statusChanges.pipe(
      startWith(this.formControl.status),
      filter((newStatus) => this._currentStatus !== newStatus),
    );

    this.subscribeTo(obs$, {
      next: (newStatus) => this.handleStatusChanged(newStatus),
    });
  }

  protected handleStatusChanged(newStatus) {
    this._currentStatus = newStatus;

    this._statusChanges$.next(this._currentStatus);
  }

  private setDependsOn$() {
    const dependsOn = this._config.dependsOn;

    if (nsArrayIsEmpty(dependsOn)) {
      return;
    }

    const obs$ = dependsOn.map((each) => each.valueChanges$);
    this.subscribeTo(combineLatest(obs$), {
      next: () => this.handleDependsOnChange(),
    });

    this.handleDependsOnChange();
  }

  private handleDependsOnChange() {
    const dependsOn = this._config.dependsOn;
    this.isDisabled = dependsOn.some((item) => !item.hasValue);

    const results = dependsOn.map((item) => item.value);
    this.handleDependingOnValuesChanged(results);

    if (this.isDisabled) {
      this.clearValue();
    }
  }

  protected handleDependingOnValuesChanged(results: any[]) {
    this._dependingValues = results;
  }

  setValue(value: any) {
    this.formControl.setValue(value);
  }

  patchValue(value: any) {
    this.formControl.patchValue(value);
  }

  protected handleErrorMessage(errorMessage: string) {
    this.formControl.setErrors({
      error: errorMessage,
    });

    this.formControl.markAsTouched();
  }

  validate() {
    this.formControl.markAsTouched({ onlySelf: false });
    this.formControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }
}
