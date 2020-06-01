import { Provider, Type } from '@angular/core';
import { NsNavigationService } from 'nikisoft-utils';
import { NsServiceProvider } from './ns-service-provider';

export interface NsDiServiceProviderConfiguration<
  TServiceProvider extends NsServiceProvider<TAppNavService>,
  TAppNavService extends NsNavigationService
> {
  service: Type<TServiceProvider>;
  navService: Type<TAppNavService>;
}

export class NsServiceProviderDiConfigurator {
  static configure<
    TServiceProvider extends NsServiceProvider<TAppNavService>,
    TAppNavService extends NsNavigationService
  >(config: NsDiServiceProviderConfiguration<TServiceProvider, TAppNavService>): Provider[] {
    return [
      config.service,
      { useExisting: config.service, provide: NsServiceProvider },
      config.navService,
      { useExisting: config.navService, provide: NsNavigationService },
    ];
  }
}
