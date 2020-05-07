import { Provider, Type } from '@angular/core';
import { NsNavigationService } from '../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../ns-service-provider';
import { NsServiceProviderComponentService } from '../ns-service-provider-component.service';
import { NsFormModel } from './ns-form.model';

export function provideFormServiceService<TService extends NsFormService<any, any, any, any>,
   TModel extends NsFormModel<any, any, any>>(service: Type<TService>, model: Type<TModel>): Provider[] {
   return [
      service,
      { useExisting: service, provide: NsFormService },
      model,
      { useExisting: model, provide: NsFormModel }
   ];
}

export abstract class NsFormService<TModel extends NsFormModel<TEntity, TServiceProvider, TAppNavService>,
   TEntity,
   TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentService<TModel, TServiceProvider, TAppNavService> {

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model, serviceProvider);
   }
}
