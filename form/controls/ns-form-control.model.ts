import { AbstractControl, ValidatorFn } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { nsObjectHasValue } from '../../../utils/helpers/ns-helpers';
import { nsIsNotNullOrEmpty } from '../../../utils/helpers/strings/ns-helpers-strings';
import { LocalizationLanguagesService } from '../../../utils/localization/localization-languages.service';
import { NsSubscriptionModel } from '../../../utils/subscription/ns-subscription.model';
import { NsFormControlValidator } from '../validators/ns-form-control.validator';
import { NsFormControlValidators } from '../validators/ns-form-control.validators';
import { NsFormControlRequiredValidator } from '../validators/provided/ns-form-control-required.validator';
import { NsFormControlConfiguration } from './ns-form-control.configuration';
import { NsFormControlDefinition } from './ns-form-control.definition';

export abstract class NsFormControlModel<TEntity,
   TFormControl extends AbstractControl,
   TConfiguration extends NsFormControlConfiguration>
   extends NsSubscriptionModel
   implements NsFormControlDefinition {

   private _langService: LocalizationLanguagesService;
   private _tabIndex: number;
   private _label: string;
   private _hint: string;
   private _isDisabled: boolean;
   private _hasValue = false;
   private _dependingValues: any[] = [];
   private readonly _validators: NsFormControlValidators;
   private _validatorsFn: ValidatorFn[];
   private _errorMessage$: Observable<string>;
   private _valueChanges$: Observable<any>;

   protected get langService(): LocalizationLanguagesService {
      return this._langService;
   }

   get formControl(): TFormControl {
      return this._formControl;
   }

   get key(): string {
      return this._config.key;
   }

   get tabIndex(): number {
      return this._tabIndex;
   }

   set tabIndex(value: number) {
      this._tabIndex = value;
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

   protected constructor(
      private readonly _formControl: TFormControl,
      protected readonly _config: TConfiguration,
   ) {
      super();

      this._validators = new NsFormControlValidators();
      this._validators.addRange(this._config.validators);

      if (this._config.isRequired === true) {
         this._validators.add(new NsFormControlRequiredValidator());
      }

      this.isDisabled = _config.isDisabled === true;
   }

   protected addValidator(validator: NsFormControlValidator) {
      this._validators.add(validator);
   }

   protected updateDisabledState() {
      if (this._isDisabled) {
         if (!this.formControl.disabled) {
            this._formControl.disable();
         }
      }
      else if (this._formControl.disabled) {
         this._formControl.enable();
      }
   }

   canClearValue(): boolean {
      return this.hasValue && !this.isDisabled;
   }

   clearValue() {
      this.setValue(this.defaultValue);
   }

   setLangService(langService: LocalizationLanguagesService) {
      this._langService = langService;
      this._validators.setLangService(langService);
   }

   onInit() {
      super.onInit();

      this.initValidators();

      this.fixLabel();

      this.updateDisabledState();

      this.setErrorMessage$();

      this.setValueChanges$();

      this.setDependsOn$();
   }

   private initValidators() {
      this._validatorsFn = this._validators.build();
      this._formControl.setValidators(this._validatorsFn);
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

      this._hint = this._config.hintId == null
                   ? null
                   : this._langService.translate(this._config.hintId);
   }

   private setErrorMessage$() {
      this._errorMessage$ = this._formControl.statusChanges
         .pipe(
            map(() => {
               const errors = this._formControl.errors;

               return errors != null && nsIsNotNullOrEmpty(errors.error)
                      ? errors.error
                      : ''
            })
         );
   }

   private setValueChanges$() {
      this._valueChanges$ = this.formControl.valueChanges
         .pipe(
            filter(value => {
               const formGroup = this._formControl.parent;
               const prevValue = formGroup.value[this.key];
               return value !== prevValue;
            })
         );

      this.subscribeTo(
         this.valueChanges$,
         {
            next: newValue => this.handleValueChanged(newValue)
         }
      )
   }

   protected handleValueChanged(newValue: any) {
      this.setHasValue(newValue);
   }

   private setHasValue(newValue: any) {
      this._hasValue = this.resolveHasValue(newValue);
   }

   protected resolveHasValue(newValue: any): boolean {
      return nsObjectHasValue(newValue);
   }

   private setDependsOn$() {
      if (this._config.dependsOn == null || this._config.dependsOn.length === 0) {
         return;
      }

      const obs$ = this._config.dependsOn.map(each => each.valueChanges$);
      this.subscribeTo(
         combineLatest(obs$),
         {
            next: results => {
               this.isDisabled = this._config.dependsOn.some(dependsOn => !dependsOn.hasValue);
               this.handleDependingOnValuesChanged(results);

               if (this.isDisabled) {
                  this.clearValue();
               }
            }
         }
      );
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

   onValuePatch(value: any) {
   }
}
