import { Provider, Type } from '@angular/core';
import {
  LocalizationLanguage,
  LocalizationLanguagesDiConfigurator, NsAuthenticateApiService,
  NsAuthenticateDiConfigurator,
  NsNavigationService, NsNoAuthenticateApiService, NsObject,
  NsStorageDiConfigurator,
} from 'nikisoft-utils';
import { DI_NS_APP_LOGO, DI_NS_VERSION } from './ns-di.tokens';
import { NsPageNotFoundAuthDiConfigurator } from './page/not-found/ns-page-not-found-auth.di-configurator';
import { NsServiceProvider } from './service-provider/ns-service-provider';
import {
  NsDiServiceProviderConfiguration,
  NsServiceProviderDiConfigurator,
} from './service-provider/ns-service-provider.di-configurator';

export interface NsDiAuthenticationConfiguration<TAuthService extends NsAuthenticateApiService> {
  service: Type<TAuthService>;
  notFoundPageRequiresAuth: boolean;
  navigateToLoginOnTokenExpiration: boolean;
}

export interface NsDiConfiguration<
  TAuthService extends NsAuthenticateApiService,
  TServiceProvider extends NsServiceProvider<TAppNavService>,
  TAppNavService extends NsNavigationService
> {
  storageKeyPrefix: string;
  defaultLanguage: LocalizationLanguage;
  usesLocalization?: boolean;
  authentication?: NsDiAuthenticationConfiguration<TAuthService>;
  serviceProvider: NsDiServiceProviderConfiguration<TServiceProvider, TAppNavService>;
  appVersion: string;
  appLogo?: string;
}

export class NsDiConfigurator {
  static configure<
    TAuthService extends NsAuthenticateApiService,
    TServiceProvider extends NsServiceProvider<TAppNavService>,
    TAppNavService extends NsNavigationService
  >(config: NsDiConfiguration<TAuthService, TServiceProvider, TAppNavService>): Provider[] {
    let providers: Provider[] = [
      NsStorageDiConfigurator.configure(config.storageKeyPrefix),
      ...LocalizationLanguagesDiConfigurator.configure(config.defaultLanguage, config.usesLocalization),
      ...NsDiConfigurator.configureAuthentication(config.authentication),
      ...NsServiceProviderDiConfigurator.configure(config.serviceProvider),
      NsDiConfigurator.configureAppVersion(config.appVersion),
    ];

    if (config.appLogo) {
      providers = [...providers, NsDiConfigurator.configureAppLogo(config.appLogo)];
    }

    return providers;
  }

  private static configureAuthentication<TAuthService extends NsAuthenticateApiService>(
    config: NsDiAuthenticationConfiguration<TAuthService>,
  ): Provider[] {
    const service = NsObject.propertyNullOrDefault(config, 'service', NsNoAuthenticateApiService);
    const notFoundPageRequiresAuth = NsObject.propertyNullOrDefault(config, 'notFoundPageRequiresAuth', false);
    const navigateToLoginOnTokenExpiration = NsObject.propertyNullOrDefault(config, 'navigateToLoginOnTokenExpiration', false);

    return [
      NsAuthenticateDiConfigurator.provideAuthService(service),
      NsPageNotFoundAuthDiConfigurator.setPageNotFoundRequiresAuth(notFoundPageRequiresAuth),
      NsAuthenticateDiConfigurator.setToLoginOnExpiration(navigateToLoginOnTokenExpiration),
    ];
  }

  private static configureAppVersion(useValue: string): Provider {
    return { provide: DI_NS_VERSION, useValue };
  }

  private static configureAppLogo(useValue: string): Provider {
    return { provide: DI_NS_APP_LOGO, useValue };
  }
}
