import { Provider, Type } from '@angular/core';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsFormService } from '../ns-form.service';
import { NsFormStepsModel } from './ns-form-steps.model';

export function registerPageFormStepsService<TService extends NsFormStepsService<any, any, any>>(
   service: Type<TService>): Provider[] {
   return [
      service,
      {
         useExisting: service,
         provide: NsFormStepsService
      }
   ];
}

export abstract class NsFormStepsService<TModel extends NsFormStepsModel<TEntity, TServiceProvider>,
   TEntity,
   TServiceProvider extends NsServiceProvider>
   extends NsFormService<TModel, TEntity, TServiceProvider> {

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model, serviceProvider);
   }

   abstract handleSaveClicked(): void;

   abstract handleCancelClicked(): void;
}
