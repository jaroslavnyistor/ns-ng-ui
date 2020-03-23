import { Observable, PartialObserver } from 'rxjs';
import { NsServiceProvider } from '../../../ns-service-provider';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControlDefinition } from '../ns-form-control.definition';
import { NsFormGroupConfiguration } from './ns-form-group.configuration';

export abstract class NsFormGroupModel<TEntity, TServiceProvider extends NsServiceProvider>
   extends NsFormModel<TEntity, TServiceProvider>
   implements NsFormControlDefinition {
   private readonly _key: string;

   get key(): string {
      return this._key;
   }

   get hasValue(): boolean {
      return this.formGroup.value[this.key] != null;
   }

   protected constructor(config: NsFormGroupConfiguration<TEntity, any>,
                         serviceProvider: TServiceProvider
   ) {
      super(config.entity, serviceProvider, config.formGroup);
      this._key = config.key;
   }

   getValueChanges$(): Observable<any> {
      return this.formGroup.valueChanges;
   }

   subscribeToValueChanges(observer: PartialObserver<any>): this {
      this.formGroup.valueChanges.subscribe(observer);
      return this;
   }
}
