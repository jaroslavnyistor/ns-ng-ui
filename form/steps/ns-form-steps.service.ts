import { Provider, Type } from '@angular/core';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsFormService } from '../ns-form.service';
import { NsFormStepsModel } from './ns-form-steps.model';

export function providePageFormStepsService<TService extends NsFormStepsService<any, any, any, any>,
   TModel extends NsFormStepsModel<any, any, any>>(service: Type<TService>, model: Type<TModel>): Provider[] {
   return [
      service,
      { useExisting: service, provide: NsFormStepsService },
      model,
      { useExisting: model, provide: NsFormStepsModel }
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
