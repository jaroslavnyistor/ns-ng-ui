import { Provider, Type } from '@angular/core';
import { NsComponentService } from '../component/ns-component.service';
import { NsServiceProvider } from '../ns-service-provider';
import { NsFormModel } from './ns-form.model';

export function registerFormServiceService<TService extends NsFormService<any, any, any>>(service: Type<TService>):
   Provider[] {
   return [
      service,
      {
         useExisting: service,
         provide: NsFormService
      }
   ];
}

export abstract class NsFormService<TModel extends NsFormModel<TEntity, TServiceProvider>,
   TEntity,
   TServiceProvider extends NsServiceProvider>
   extends NsComponentService<TModel> {

   protected readonly _serviceProvider: TServiceProvider;

   protected constructor(
      model: TModel,
      serviceProvider: TServiceProvider
   ) {
      super(model);

      this._serviceProvider = serviceProvider;
   }
}
