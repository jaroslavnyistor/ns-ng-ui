import { Provider, Type } from '@angular/core';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsServiceProviderComponentService } from '../../ns-service-provider-component.service';
import { NsPageModel } from './ns-page.model';

export function providePageService<TService extends NsPageService<any, any, any>,
   TModel extends NsPageModel<any, any>>(service: Type<TService>, model: Type<TModel>): Provider[] {
   return [
      service,
      {
         useExisting: service,
         provide: NsPageService
      },
      model
   ];
}

export abstract class NsPageService<TModel extends NsPageModel<TServiceProvider, TAppNavService>,
   TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentService<TModel, TServiceProvider, TAppNavService> {

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model, serviceProvider);
   }
}
