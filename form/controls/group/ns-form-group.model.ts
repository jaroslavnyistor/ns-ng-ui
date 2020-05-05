import { Observable, PartialObserver } from 'rxjs';
import { NsNavigationService } from '../../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../../ns-service-provider';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControlDefinition } from '../ns-form-control.definition';
import { NsFormGroup } from '../ns-form-group';
import { NsFormGroupConfiguration } from './ns-form-group.configuration';

export abstract class NsFormGroupModel<TParentEntity,
   TEntity,
   TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsFormModel<TEntity, TServiceProvider, TAppNavService>
   implements NsFormControlDefinition {
   private readonly _key: string;

   get key(): string {
      return this._key;
   }

   get hasValue(): boolean {
      return this.formGroup.value[this.key] != null;
   }

   protected constructor(parent: NsFormModel<TParentEntity, TServiceProvider, TAppNavService>,
                         serviceProvider: TServiceProvider,
                         config: NsFormGroupConfiguration
   ) {
      super(
         parent.formGroup.value[config.key] as TEntity,
         serviceProvider,
         parent.formGroup.controls[config.key] as NsFormGroup
      );
      this._key = config.key;
   }

   getValueChanges$(): Observable<any> {
      return this.formGroup.valueChanges;
   }

   subscribeToValueChanges(observer: PartialObserver<any>): this {
      this.subscribeTo(this.formGroup.valueChanges, observer);

      return this;
   }
}
