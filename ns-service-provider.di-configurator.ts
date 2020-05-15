import { Provider, Type } from '@angular/core';
import { NsNavigationService } from '../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from './ns-service-provider';

export interface NsDiServiceProviderConfiguration<TServiceProvider extends NsServiceProvider, TNavService extends NsNavigationService> {
   service: Type<TServiceProvider>,
   navService: Type<TNavService>
}

export class NsServiceProviderDiConfigurator {
   static configure<TServiceProvider extends NsServiceProvider, TNavService extends NsNavigationService>(
      config: NsDiServiceProviderConfiguration<TServiceProvider, TNavService>
   ): Provider[] {
      return [
         config.service,
         { useExisting: config.service, provide: NsServiceProvider },
         config.navService,
         { useExisting: config.navService, provide: NsNavigationService },
      ];
   }
}
