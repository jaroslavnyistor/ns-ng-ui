import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { combineLatest, Observable, PartialObserver, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { nsNull, nsObjectHasValue } from '../../../utils/helpers/ns-helpers';
import { nsIsNotNullOrEmpty } from '../../../utils/helpers/strings/ns-helpers-strings';
import { LocalizationLanguagesService } from '../../../utils/localization/localization-languages.service';
import { NsSubscriptionModel } from '../../../utils/subscription/ns-subscription.model';
import { NsFormModel } from '../ns-form.model';
import { NsFormControlValidator } from '../validators/ns-form-control.validator';
import { NsFormControlValidators } from '../validators/ns-form-control.validators';
import { NsFormControlRequiredValidator } from '../validators/provided/ns-form-control-required.validator';
import { NsFormControlConfiguration } from './ns-form-control.configuration';
import { NsFormControlDefinition } from './ns-form-control.definition';

export abstract class NsFormControlModel<TEntity,
   TFormControlModel extends NsFormControlModel<TEntity, TFormControlModel, TFormControl>,
   TFormControl extends AbstractControl>
   extends NsSubscriptionModel
   implements NsFormControlDefinition {
   private readonly _statusChanges$: Subject<any>;
   private readonly _valueChanges$: Subject<any>;
   private readonly _parent: NsFormModel<TEntity, any, any>;
   private readonly _validators: NsFormControlValidators;
   private _validatorsFn: ValidatorFn[];
   private readonly _key: string;
   private readonly _formControl: TFormControl;
   private _hasValue = false;
   private _errorMessage: string;
   private readonly _isRequired: boolean;
   private _isDisabled: boolean;
   private readonly _tabIndex: number;
   private readonly _labelId: any;
   private _label: string;
   private readonly _hintId: any;
   private _hint: string;
   private _dependingOn: NsFormControlDefinition[] = [];
   protected _initialValue = [];
   private _dependingValues: any[] = [];
   private _defaultValue: any;

   protected get validatorsFn(): ValidatorFn[] {
      return this._validatorsFn;
   }

   get langService(): LocalizationLanguagesService {
      return this._parent.langService;
   }

   get key(): string {
      return this._key;
   }

   get value(): any {
      return this._formControl.value;
   }

   get formControl(): TFormControl {
      return this._formControl;
   }

   get formGroup(): FormGroup {
      return this._parent.formGroup;
   }

   get errorMessage(): string {
      return this._errorMessage;
   }

   get isRequired(): boolean {
      return this._isRequired;
   }

   get tabIndex(): number {
      return this._tabIndex;
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

   get label(): string {
      return this._label;
   }

   get isHintVisible(): boolean {
      return this._hint != null;
   }

   get hint(): string {
      return this._hint;
   }

   get hasValue(): boolean {
      return this._hasValue;
   }

   protected get hasDependingValues(): boolean {
      return this._dependingValues.length > 0;
   }

   protected get dependingValues(): any[] {
      return this._dependingValues;
   }

   protected get defaultValue(): any {
      return this._defaultValue;
   }

   protected set defaultValue(value: any) {
      this._defaultValue = value;
   }

   protected constructor(parent: NsFormModel<TEntity, any, any>,
                         config: NsFormControlConfiguration
   ) {
      super();

      this._statusChanges$ = new Subject<any>();
      this._valueChanges$ = new Subject<any>();

      this._parent = parent;
      this._validators = new NsFormControlValidators(this.langService);

      this._formControl = parent.formGroup.controls[config.key] as TFormControl;

      this._key = config.key;

      this._labelId = config.labelId;
      this._hintId = config.hintId;

      this._validators.addRange(config.validators);

      this._isRequired = nsNull(config.isRequired, false);
      if (this._isRequired) {
         this._validators.add(new NsFormControlRequiredValidator());
      }

      this._isDisabled = nsNull(config.isDisabled, false);

      this._tabIndex = config.tabIndex;

      this._dependingOn = nsNull(config.dependsOn, []);

      this._statusChanges$.next(this.formControl.status);

      this.setHasValue(this.value);
   }

   protected addValidator(validator: NsFormControlValidator) {
      this._validators.add(validator);
   }

   protected updateDisabledState() {
      if (this._isDisabled) {
         if (!this.formControl.disabled) {
            this._formControl.disable();
         }
      } else if (this._formControl.disabled) {
         this._formControl.enable();
      }
   }

   canClearValue(): boolean {
      return this.hasValue && !this.isDisabled;
   }

   clearValue() {
      this.setValue(this.defaultValue);
   }

   onInit() {
      super.onInit();

      this.initValidators();

      this.fixLabel();

      this.updateDisabledState();

      this.subscribeInternallyToStatusChanges();

      this.subscribeInternallyToValueChanges();

      this.subscribeToDependingOn();
   }

   private initValidators() {
      this._validatorsFn = this._validators.build();
      this._formControl.setValidators(this._validatorsFn);
   }

   private fixLabel() {
      if (this._labelId == null) {
         return;
      }

      this._label = this.langService.translate(this._labelId);

      if (this.isRequired) {
         this._label = `${this._label}*`;
      }

      this._hint = this._hintId == null
         ? null
         : this.langService.translate(this._hintId);
   }

   private subscribeInternallyToStatusChanges() {
      this.subscribeTo(
         this._formControl.statusChanges,
         {
            next: newStatus => this.handleStatusChanged(newStatus)
         }
      );
   }

   protected handleStatusChanged(newStatus: any) {
      this.validate();

      this._statusChanges$.next(newStatus);
   }

   subscribeToStatusChanges(observer: PartialObserver<any>): this {
      this.subscribeTo(this._statusChanges$, observer);

      return this;
   }

   private validate() {
      const errors = this.getFormControlErrors();

      this._errorMessage = errors != null && nsIsNotNullOrEmpty(errors.error)
         ? errors.error
         : '';
   }

   protected getFormControlErrors(): ValidationErrors {
      return this._formControl.errors;
   }

   private subscribeInternallyToValueChanges() {
      this.subscribeTo(
         this.processFormControlValueChanges(),
         {
            next: newValue => this.handleValueChanged(newValue)
         }
      );
   }

   private processFormControlValueChanges() {
      return this.formControl.valueChanges
         .pipe(
            filter(value => {
               const prevValue = this.formGroup.value[this.key];
               return value !== prevValue;
            })
         );
   }

   getValueChanges$(): Observable<any> {
      return this._valueChanges$;
   }

   subscribeToValueChanges(observer: PartialObserver<any>): this {
      this.subscribeTo(this._valueChanges$, observer);

      return this;
   }

   protected handleValueChanged(newValue: any) {
      this.setHasValue(newValue);

      this._valueChanges$.next(newValue);
   }

   private setHasValue(newValue: any) {
      this._hasValue = this.resolveHasValue(newValue);
   }

   protected resolveHasValue(newValue: any): boolean {
      return nsObjectHasValue(newValue);
   }

   private subscribeToDependingOn() {
      const dependingOn$ = this._dependingOn.map(each => each.getValueChanges$());

      if (dependingOn$.length > 0) {
         this.subscribeTo(
            combineLatest(dependingOn$),
            {
               next: results => {
                  this.isDisabled = this.isOneOfDependingOnMissingValue();
                  this.handleDependingOnValuesChanged(results);

                  if (this.isDisabled) {
                     this.clearValue();
                  }
               }
            }
         );
      }
   }

   private isOneOfDependingOnMissingValue() {
      return this._dependingOn.some(dependsOn => !dependsOn.hasValue);
   }

   protected handleDependingOnValuesChanged(results: any[]) {
      this._dependingValues = results;
   }

   setValue(value: any) {
      this._formControl.setValue(value);
   }

   patchValue(value: any) {
      this._formControl.patchValue(value);
   }

   protected handleErrorMessage(errorMessage: string) {
      this._formControl.setErrors({
         error: errorMessage
      });
      this._formControl.markAsTouched({ onlySelf: false });
   }

   onInitialEntitySet(value: any): void {
      this._initialValue = value;
   }
}
