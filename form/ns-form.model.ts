import { FormGroup } from '@angular/forms';
import { NsNavigationService } from '../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../service-provider/ns-service-provider';
import { NsServiceProviderComponentModel } from '../service-provider/ns-service-provider-component.model';
import { NsFormControlCheckboxConfiguration } from './controls/checkbox/ns-form-control-checkbox.configuration';
import { NsFormControlCheckboxModel } from './controls/checkbox/ns-form-control-checkbox.model';
import { NsFormControlDateTimePickerConfiguration } from './controls/date-time/ns-form-control-date-time-picker.configuration';
import { NsFormControlDateTimePickerModel } from './controls/date-time/ns-form-control-date-time-picker.model';
import { NsFormControlDatePickerConfiguration } from './controls/date/ns-form-control-date-picker.configuration';
import { NsFormControlDatePickerModel } from './controls/date/ns-form-control-date-picker.model';
import { NsFormControlInputType } from './controls/input/ns-form-control-input-type.enum';
import { NsFormControlInputConfiguration } from './controls/input/ns-form-control-input.configuration';
import { NsFormControlInputModel } from './controls/input/ns-form-control-input.model';
import { NsFormControlDefinition } from './controls/ns-form-control.definition';
import { NsFormControlNumberConfiguration } from './controls/number/ns-form-control-number.configuration';
import { NsFormControlNumberModel } from './controls/number/ns-form-control-number.model';
import { NsFormControlTimePickerConfiguration } from './controls/time/ns-form-control-time-picker.configuration';
import { NsFormControlTimePickerModel } from './controls/time/ns-form-control-time-picker.model';
import { NsFormControlValidator } from './validators/ns-form-control.validator';
import { NsFormControlValidators } from './validators/ns-form-control.validators';

export abstract class NsFormModel<TEntity,
   TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentModel<TServiceProvider, TAppNavService> {

   private readonly _formGroup: FormGroup;
   private readonly _formModels: NsFormControlDefinition[];
   private readonly _validators: NsFormControlValidators;
   private _initialEntity: TEntity;
   private _currentEntity: TEntity;

   get formGroup(): FormGroup {
      return this._formGroup;
   }

   get isFormValid(): boolean {
      return this.formGroup.valid;
   }

   get initialEntity(): TEntity {
      return this._initialEntity;
   }

   get currentEntity(): TEntity {
      return this._currentEntity;
   }

   protected constructor(serviceProvider: TServiceProvider, formGroup: FormGroup = null) {
      super(serviceProvider);

      this._formGroup = formGroup || new FormGroup({});

      this._formModels = [];
      this._validators = new NsFormControlValidators();
   }

   onInit() {
      super.onInit();

      this.subscribeToFormValueChanges();

      this.subscribeToFormStatusChanges();

      this._validators.setLangService(this.langService);

      this._formModels.forEach(model => {
         model.setLangService(this.langService);
         this._formGroup.addControl(model.key, model.formControl);
         model.onInit();
      });

      this._formGroup.setValidators(this._validators.build());
   }

   private subscribeToFormValueChanges() {
      this.subscribeTo(
         this._formGroup.valueChanges,
         {
            next: () => this.handleValueChanged(this.formGroup.getRawValue())
         }
      );
   }

   protected handleValueChanged(newValue: TEntity) {
      this._currentEntity = {
         ...this._initialEntity,
         ...newValue
      };
   }

   private subscribeToFormStatusChanges() {
      this.subscribeTo(
         this._formGroup.statusChanges,
         {
            next: () => this.handleStatusChanged()
         }
      );
   }

   protected handleStatusChanged() {
   }

   onDestroy(): void {
      super.onDestroy();

      this._formModels.forEach(model => model.onDestroy());
   }

   setInitialEntity(value: TEntity) {
      this._initialEntity = value;
      this.patchValue(value);
   }

   patchValue(value: any) {
      this._formModels.forEach(formModel => {
         const formModelValue = value[formModel.key];

         if (formModelValue != null) {
            formModel.onValuePatch(formModelValue);
         }
      });

      this._formGroup.patchValue(value);
   }

   validate(): boolean {
      this.formGroup.markAllAsTouched();
      this.formGroup.markAsDirty({ onlySelf: false })
      this.formGroup.updateValueAndValidity({onlySelf: false, emitEvent: true});
      return this.isFormValid;
   }

   protected addText(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
      return this.addInput(NsFormControlInputType.Text, config);
   }

   protected addPassword(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
      return this.addInput(NsFormControlInputType.Password, config);
   }

   protected addNumber(config: NsFormControlNumberConfiguration): NsFormControlNumberModel<TEntity> {
      const model = new NsFormControlNumberModel<TEntity>(config);

      this.register(model);

      return model;
   }

   protected addEmail(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
      return this.addInput(NsFormControlInputType.Email, config);
   }

   protected addUrl(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
      return this.addInput(NsFormControlInputType.Url, config);
   }

   private addInput(
      type: NsFormControlInputType,
      config: NsFormControlInputConfiguration
   ): NsFormControlInputModel<TEntity> {
      const model = new NsFormControlInputModel<TEntity>(type, config);

      this.register(model);

      return model;
   }

   protected addCheckBox(config: NsFormControlCheckboxConfiguration): NsFormControlCheckboxModel<TEntity> {
      const model = new NsFormControlCheckboxModel<TEntity>(config);

      this.register(model);

      return model;
   }

   protected addDate(config: NsFormControlDatePickerConfiguration): NsFormControlDatePickerModel<TEntity> {
      const model = new NsFormControlDatePickerModel<TEntity>(config);

      this.register(model);

      return model;
   }

   protected addTime(config: NsFormControlTimePickerConfiguration): NsFormControlTimePickerModel<TEntity> {
      const model = new NsFormControlTimePickerModel<TEntity>(config);

      this.register(model);

      return model;
   }

   protected addDateTime(config: NsFormControlDateTimePickerConfiguration): NsFormControlDateTimePickerModel<TEntity> {
      const model = new NsFormControlDateTimePickerModel<TEntity>(config);

      this.register(model);

      return model;
   }

   protected add<TModel extends NsFormControlDefinition>(model: TModel): TModel {
      this.register(model);

      return model;
   }

   private register(model: NsFormControlDefinition) {
      model.tabIndex = this._formModels.length + 1;

      this._formModels.push(model);
   }

   protected addValidators(validators: NsFormControlValidator[]) {
      this._validators.addRange(validators);
   }
}
