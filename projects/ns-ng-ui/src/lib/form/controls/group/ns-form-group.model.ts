import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocalizationLanguagesService } from 'ns-js-utils';
import { NsNavigationService } from 'ns-js-utils';
import { NsServiceProvider } from '../../../service-provider/ns-service-provider';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControlDefinition } from '../ns-form-control.definition';
import { NsFormGroup } from './ns-form-group';
import { NsFormGroupConfiguration } from './ns-form-group.configuration';

export abstract class NsFormGroupModel<
  TParentEntity,
  TEntity,
  TServiceProvider extends NsServiceProvider<TAppNavService>,
  TAppNavService extends NsNavigationService
> extends NsFormModel<TEntity, TServiceProvider, TAppNavService> implements NsFormControlDefinition {
  private readonly _key: string;

  get key(): string {
    return this._key;
  }

  get formControl(): AbstractControl {
    return this.formGroup;
  }

  get valueChanges$(): Observable<any> {
    return this.formControl.valueChanges;
  }

  get value(): any {
    return this.formGroup.value;
  }

  get hasValue(): boolean {
    return this.formGroup.value[this.key] != null;
  }

  protected constructor(serviceProvider: TServiceProvider, entity: TEntity, config: NsFormGroupConfiguration) {
    super(serviceProvider, entity);
    this._key = config.key;
  }

  setFormControl(formControl: NsFormGroup) {}

  setLangService(langService: LocalizationLanguagesService) {}

  onValuePatch(value: any) {}
}
