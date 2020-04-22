import { FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { LocalizationLanguagesService } from '../../utils/localization/localization-languages.service';
import { NsComponentModel } from '../component/ns-component.model';
import { NsServiceProvider } from '../ns-service-provider';
import { NsFormControlArrayItemEntity } from './controls/array/ns-form-control-array-item.entity';
import { NsFormControlArrayItemModel } from './controls/array/ns-form-control-array-item.model';
import { NsFormControlArrayConfiguration } from './controls/array/ns-form-control-array.configuration';
import { NsFormControlArrayModel } from './controls/array/ns-form-control-array.model';
import { NsFormControlAutocompleteConfiguration } from './controls/autocomplete/ns-form-control-autocomplete.configuration';
import { NsFormControlAutocompleteModel } from './controls/autocomplete/ns-form-control-autocomplete.model';
import { NsFormControlCheckboxConfiguration } from './controls/checkbox/ns-form-control-checkbox.configuration';
import { NsFormControlCheckboxModel } from './controls/checkbox/ns-form-control-checkbox.model';
import { NsFormControlDateTimePickerConfiguration } from './controls/date-time/ns-form-control-date-time-picker.configuration';
import { NsFormControlDateTimePickerModel } from './controls/date-time/ns-form-control-date-time-picker.model';
import { NsFormControlDatePickerConfiguration } from './controls/date/ns-form-control-date-picker.configuration';
import { NsFormControlDatePickerModel } from './controls/date/ns-form-control-date-picker.model';
import { NsFormGroupModel } from './controls/group/ns-form-group.model';
import { NsFormControlInputType } from './controls/input/ns-form-control-input-type.enum';
import { NsFormControlInputConfiguration } from './controls/input/ns-form-control-input.configuration';
import { NsFormControlInputModel } from './controls/input/ns-form-control-input.model';
import { NsFormControlMultiSelectItemEntity } from './controls/multi-select/ns-form-control-multi-select-item.entity';
import { NsFormControlMultiSelectConfiguration } from './controls/multi-select/ns-form-control-multi-select.configuration';
import { NsFormControlMultiSelectModel } from './controls/multi-select/ns-form-control-multi-select.model';
import { NsFormControlConfiguration } from './controls/ns-form-control.configuration';
import { NsFormControlDefinition } from './controls/ns-form-control.definition';
import { NsFormControlNumberConfiguration } from './controls/number/ns-form-control-number.configuration';
import { NsFormControlNumberModel } from './controls/number/ns-form-control-number.model';
import { NsFormControlSelectItemEntity } from './controls/select/ns-form-control-select-item.entity';
import { NsFormControlSelectConfiguration } from './controls/select/ns-form-control-select.configuration';
import { NsFormControlSelectModel } from './controls/select/ns-form-control-select.model';
import { NsFormControlTimePickerConfiguration } from './controls/time/ns-form-control-time-picker.configuration';
import { NsFormControlTimePickerModel } from './controls/time/ns-form-control-time-picker.model';
import { NsFormBuilder } from './ns-form-builder';
import { NsFormControlValidator } from './validators/ns-form-control.validator';
import { NsFormControlValidators } from './validators/ns-form-control.validators';

export abstract class NsFormModel<TEntity, TServiceProvider extends NsServiceProvider> extends NsComponentModel {
   private readonly _formGroup: FormGroup;
   private readonly _formModels: NsFormControlDefinition[];
   private readonly _serviceProvider: TServiceProvider;
   private readonly _validators: NsFormControlValidators;
   private _initialEntity: TEntity;
   private _currentEntity: TEntity;

   private get nextTabIndex(): number {
      return this._formModels.length + 1;
   }

   protected get configuration(): TServiceProvider {
      return this._serviceProvider;
   }

   get serviceProvider(): TServiceProvider {
      return this._serviceProvider;
   }

   get langService(): LocalizationLanguagesService {
      return this._serviceProvider.langService;
   }

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

   get clonedCurrentEntity(): TEntity {
      return cloneDeep(this.currentEntity);
   }

   protected constructor(
      entity: TEntity,
      serviceProvider: TServiceProvider,
      formGroup: FormGroup = null
   ) {
      super();
      this._serviceProvider = serviceProvider;

      this._initialEntity = entity;
      this._currentEntity = entity;

      if (formGroup == null) {
         const formBuilder = new NsFormBuilder();
         this._formGroup = formBuilder.build(entity);
      } else {
         this._formGroup = formGroup;
      }

      this._formModels = [];
      this._validators = new NsFormControlValidators(this.langService);

      this.subscribeToFormValueChanges();
      this.subscribeToFormStatusChanges();
   }

   onInit() {
      super.onInit();

      this._formGroup.setValidators(this._validators.build());

      this._formModels.forEach(model => model.onInit());
   }

   onDestroy(): void {
      super.onDestroy();

      this._formModels.forEach(model => model.onDestroy());
   }

   setInitialEntity(value: TEntity) {
      this._initialEntity = value;
      this.patchValue(value);

      this.onInitialEntitySet();

      this._formModels.forEach(formModel => {
         const formModelValue = value[formModel.key];
         formModel.onInitialEntitySet(formModelValue);
      });
   }

   onInitialEntitySet(): void {
   }

   patchValue(value: any) {
      this._formGroup.patchValue(value);
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
      this._currentEntity = newValue;
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

   protected addText(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
      return this.addInput(NsFormControlInputType.Text, config);
   }

   protected addPassword(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
      return this.addInput(NsFormControlInputType.Password, config);
   }

   protected addNumber(config: NsFormControlNumberConfiguration): NsFormControlNumberModel<TEntity> {
      const model = new NsFormControlNumberModel<TEntity>(this, config);
      this.register(config, model);
      return model;
   }

   protected addEmail(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
      return this.addInput(NsFormControlInputType.Email, config);
   }

   protected addUrl(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
      return this.addInput(NsFormControlInputType.Url, config);
   }

   private addInput(type: NsFormControlInputType, config: NsFormControlInputConfiguration) {
      const model = new NsFormControlInputModel(this, type, config);
      this.register(config, model);
      return model;
   }

   protected addCheckBox(config: NsFormControlCheckboxConfiguration): NsFormControlCheckboxModel<TEntity> {
      const model = new NsFormControlCheckboxModel<TEntity>(this, config);
      this.register(config, model);
      return model;
   }

   protected addDate(config: NsFormControlDatePickerConfiguration): NsFormControlDatePickerModel<TEntity> {
      const model = new NsFormControlDatePickerModel<TEntity>(this, config);
      this.register(config, model);
      return model;
   }

   protected addTime(config: NsFormControlTimePickerConfiguration): NsFormControlTimePickerModel<TEntity> {
      const model = new NsFormControlTimePickerModel<TEntity>(this, config);
      this.register(config, model);
      return model;
   }

   protected addDateTime(config: NsFormControlDateTimePickerConfiguration): NsFormControlDateTimePickerModel<TEntity> {
      const model = new NsFormControlDateTimePickerModel<TEntity>(this, config);
      this.register(config, model);
      return model;
   }

   protected addSelect<TSelectItem extends NsFormControlSelectItemEntity>(
      config: NsFormControlSelectConfiguration<TSelectItem>
   ): NsFormControlSelectModel<TEntity, TSelectItem> {
      const model = new NsFormControlSelectModel<TEntity, TSelectItem>(this, config);
      this.register(config, model);
      return model;
   }

   addAutoComplete(config: NsFormControlAutocompleteConfiguration): NsFormControlAutocompleteModel<TEntity> {
      const model = new NsFormControlAutocompleteModel<TEntity>(this, config);
      this.register(config, model);
      return model;
   }

   addMultiSelect<TMultiSelectItem extends NsFormControlMultiSelectItemEntity>(
      config: NsFormControlMultiSelectConfiguration<TMultiSelectItem>
   ): NsFormControlMultiSelectModel<TEntity, TMultiSelectItem> {
      const model = new NsFormControlMultiSelectModel<TEntity, TMultiSelectItem>(this, config);
      this.register(config, model);
      return model;
   }

   protected addArray<TArrayItem extends NsFormControlArrayItemModel<TArrayItemEntity, TServiceProvider>,
      TArrayItemEntity extends NsFormControlArrayItemEntity>(
      config: NsFormControlArrayConfiguration
   ): NsFormControlArrayModel<TEntity, TArrayItem, TArrayItemEntity, TServiceProvider> {
      const model = new NsFormControlArrayModel<TEntity, TArrayItem, TArrayItemEntity, TServiceProvider>(
         this,
         config
      );
      this.register(config, model);
      return model;
   }

   protected addGroup<TGroupEntity, TGroupModel extends NsFormGroupModel<TEntity, TGroupEntity, TServiceProvider>>(
      groupModel: TGroupModel,
   ): TGroupModel {
      this._formModels.push(groupModel);
      return groupModel;
   }

   private register(config: NsFormControlConfiguration, model: NsFormControlDefinition) {
      config.tabIndex = this.nextTabIndex;
      this._formModels.push(model);
   }

   protected addValidators(validators: NsFormControlValidator[]) {
      this._validators.addRange(validators);
   }
}
