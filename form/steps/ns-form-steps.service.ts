import { Provider, Type } from '@angular/core';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsFormService } from '../ns-form.service';
import { NsFormStepsModel } from './ns-form-steps.model';

export function registerPageFormStepsService<TService extends NsFormStepsService<any, any, any, any>>(
   service: Type<TService>): Provider[] {
   return [
      service,
      {
         useExisting: service,
         provide: NsFormStepsService
      }
   ];
}

export abstract class NsFormStepsService<TModel extends NsFormStepsModel<TEntity, TServiceProvider, TAppNavService>,
   TEntity,
   TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsFormService<TModel, TEntity, TServiceProvider, TAppNavService> {

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model, serviceProvider);
   }

   abstract handleSaveClicked(): void;

   abstract handleCancelClicked(): void;
}
