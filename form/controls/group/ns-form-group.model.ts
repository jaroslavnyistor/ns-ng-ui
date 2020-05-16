import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocalizationLanguagesService } from '../../../../utils/localization/localization-languages.service';
import { NsNavigationService } from '../../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../../service-provider/ns-service-provider';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControlDefinition } from '../ns-form-control.definition';
import { NsFormGroupConfiguration } from './ns-form-group.configuration';

export abstract class NsFormGroupModel<TParentEntity,
   TEntity,
   TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsFormModel<TEntity, TServiceProvider, TAppNavService>
   implements NsFormControlDefinition {

   private readonly _key: string;
   private _tabIndex: number;

   get key(): string {
      return this._key;
   }

   get tabIndex(): number {
      return this._tabIndex;
   }

   set tabIndex(value: number) {
      this._tabIndex = value;
   }

   get formControl(): AbstractControl {
      return this.formGroup
   }

   get valueChanges$(): Observable<any> {
      return this.formControl.valueChanges;
   }

   get hasValue(): boolean {
      return this.formGroup.value[this.key] != null;
   }

   protected constructor(
      config: NsFormGroupConfiguration,
      serviceProvider: TServiceProvider,
   ) {
      super(serviceProvider, new FormGroup({}));
      this._key = config.key;
   }

   setLangService(langService: LocalizationLanguagesService) {
   }
}
