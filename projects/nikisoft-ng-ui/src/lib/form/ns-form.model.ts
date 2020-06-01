import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { NsNavigationService } from 'nikisoft-utils';
import { NsServiceProvider } from '../service-provider/ns-service-provider';
import { NsServiceProviderComponentModel } from '../service-provider/ns-service-provider-component.model';
import { NsFormControlCheckboxConfiguration } from './controls/checkbox/ns-form-control-checkbox.configuration';
import { NsFormControlCheckboxModel } from './controls/checkbox/ns-form-control-checkbox.model';
import { NsFormControlDateTimePickerConfiguration } from './controls/date-time/ns-form-control-date-time-picker.configuration';
import { NsFormControlDateTimePickerModel } from './controls/date-time/ns-form-control-date-time-picker.model';
import { NsFormControlDatePickerConfiguration } from './controls/date/ns-form-control-date-picker.configuration';
import { NsFormControlDatePickerModel } from './controls/date/ns-form-control-date-picker.model';
import { NsFormGroup } from './controls/group/ns-form-group';
import { NsFormControlInputType } from './controls/input/ns-form-control-input-type.enum';
import { NsFormControlInputConfiguration } from './controls/input/ns-form-control-input.configuration';
import { NsFormControlInputModel } from './controls/input/ns-form-control-input.model';
import { NsAbstractControl, NsFormControlDefinition } from './controls/ns-form-control.definition';
import { NsFormControlNumberConfiguration } from './controls/number/ns-form-control-number.configuration';
import { NsFormControlNumberModel } from './controls/number/ns-form-control-number.model';
import { NsFormControlTimePickerConfiguration } from './controls/time/ns-form-control-time-picker.configuration';
import { NsFormControlTimePickerModel } from './controls/time/ns-form-control-time-picker.model';
import { NsFormBuilder } from './ns-form.builder';
import { NsFormControlValidator } from './validators/ns-form-control.validator';
import { NsFormControlValidators } from './validators/ns-form-control.validators';

export abstract class NsFormModel<
  TEntity,
  TServiceProvider extends NsServiceProvider<TAppNavService>,
  TAppNavService extends NsNavigationService
> extends NsServiceProviderComponentModel<TServiceProvider, TAppNavService> {
  private readonly _formGroup: NsFormGroup;
  private readonly _formModels: NsFormControlDefinition[];
  private readonly _validators: NsFormControlValidators;
  private _initialEntity: TEntity;
  private _statusChanges$: Observable<any>;

  get formGroup(): NsFormGroup {
    return this._formGroup;
  }

  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  get initialEntity(): TEntity {
    return this._initialEntity;
  }

  get currentEntity(): TEntity {
    return this.formGroup.value;
  }

  get status(): any {
    return this.formGroup.status;
  }

  get statusChanges$(): Observable<any> {
    return this._statusChanges$;
  }

  constructor(serviceProvider: TServiceProvider, entity: TEntity, formGroup: NsFormGroup = null) {
    super(serviceProvider);

    if (formGroup != null) {
      this._formGroup = formGroup;
    } else {
      const builder = new NsFormBuilder();
      this._formGroup = builder.build(entity);
    }

    this._formModels = [];
    this._validators = new NsFormControlValidators();
  }

  onInit() {
    super.onInit();

    this.initializeFormModels();

    this.setValidators();

    this.setStatusChanges$();
  }

  private initializeFormModels() {
    this._formModels.forEach((formModel) => {
      const formControl = this.formGroup.get(formModel.key) as NsAbstractControl;
      formModel.setFormControl(formControl);
      formModel.setLangService(this.langService);
      formModel.onInit();
    });
  }

  private setValidators() {
    this._validators.setLangService(this.langService);
    this.formGroup.setValidators(this._validators.build());
  }

  private setStatusChanges$() {
    this._statusChanges$ = this.formGroup.statusChanges.pipe(startWith(this.formGroup.status));

    this.subscribeTo(this._statusChanges$, {
      next: (status) => this.handleStatusChanged(status),
    });
  }

  protected handleStatusChanged(newStatus: any) {}

  onDestroy(): void {
    super.onDestroy();

    this._formModels.forEach((model) => model.onDestroy());
  }

  setInitialEntity(value: TEntity) {
    this._initialEntity = value;
    this.patchValue(value);
  }

  patchValue(value: any) {
    this._formModels.forEach((formModel) => {
      const formModelValue = value[formModel.key];

      if (formModelValue != null) {
        formModel.onValuePatch(formModelValue);
      }
    });

    this.formGroup.patchValue(value);
    this.formGroup.updateValueAndValidity();
  }

  validate(): boolean {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    return this.isFormValid;
  }

  protected addText(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
    return this.addInput(NsFormControlInputType.Text, config);
  }

  protected addPassword(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
    return this.addInput(NsFormControlInputType.Password, config);
  }

  protected addEmail(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
    return this.addInput(NsFormControlInputType.Email, config);
  }

  protected addUrl(config: NsFormControlInputConfiguration): NsFormControlInputModel<TEntity> {
    return this.addInput(NsFormControlInputType.Url, config);
  }

  private addInput(
    type: NsFormControlInputType,
    config: NsFormControlInputConfiguration,
  ): NsFormControlInputModel<TEntity> {
    const model = new NsFormControlInputModel<TEntity>(type, config);

    this.register(model);

    return model;
  }

  protected addNumber(config: NsFormControlNumberConfiguration): NsFormControlNumberModel<TEntity> {
    const model = new NsFormControlNumberModel<TEntity>(config);

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
    this._formModels.push(model);
  }

  protected addValidators(validators: NsFormControlValidator[]) {
    this._validators.addRange(validators);
  }
}
