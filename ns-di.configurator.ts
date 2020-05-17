import { Provider, Type } from '@angular/core';
import { NsAuthenticateDiConfigurator } from '../utils/authentication/ns-authenticate.di-configurator';
import {
   NsAuthenticationApiService,
   NsNoAuthenticationApiService
} from '../utils/authentication/ns-authentication-api.service';
import { nsObjectIsNullValue } from '../utils/helpers/ns-helpers';
import { LocalizationLanguagesDiConfigurator } from '../utils/localization/localization-languages.di-configurator';
import { LocalizationLanguage } from '../utils/localization/localization.language';
import { NsNavigationService } from '../utils/navigation/ns-navigation.service';
import { NsStorageDiConfigurator } from '../utils/storage/ns-storage.di-configurator';
import { DI_NS_APP_LOGO, DI_NS_VERSION } from './ns-di.tokens';
import { NsPageNotFoundAuthDiConfigurator } from './page/not-found/ns-page-not-found-auth.di-configurator';
import { NsServiceProvider } from './service-provider/ns-service-provider';
import {
   NsDiServiceProviderConfiguration,
   NsServiceProviderDiConfigurator
} from './service-provider/ns-service-provider.di-configurator';

export interface NsDiAuthenticationConfiguration<TAuthService extends NsAuthenticationApiService> {
   service: Type<TAuthService>,
   notFoundPageRequiresAuth: boolean;
   navigateToLoginOnTokenExpiration: boolean;
}

export interface NsDiConfiguration<TAuthService extends NsAuthenticationApiService,
   TServiceProvider extends NsServiceProvider<TAppNavService>, TAppNavService extends NsNavigationService> {
   storageKeyPrefix: string;
   defaultLanguage: LocalizationLanguage,
   authentication?: NsDiAuthenticationConfiguration<TAuthService>,
   serviceProvider: NsDiServiceProviderConfiguration<TServiceProvider, TAppNavService>,
   appVersion: string,
   appLogo?: string,
}

export class NsDiConfigurator {
   static configure<TAuthService extends NsAuthenticationApiService,
      TServiceProvider extends NsServiceProvider<TAppNavService>,
      TAppNavService extends NsNavigationService>(
      config: NsDiConfiguration<TAuthService, TServiceProvider, TAppNavService>
   ): Provider[] {
      let providers: Provider[] = [
         NsStorageDiConfigurator.configure(config.storageKeyPrefix),
         ...LocalizationLanguagesDiConfigurator.configure(config.defaultLanguage),
         ...NsDiConfigurator.configureAuthentication(config.authentication),
         ...NsServiceProviderDiConfigurator.configure(config.serviceProvider),
         NsDiConfigurator.configureAppVersion(config.appVersion),
      ];

      if (config.appLogo) {
         providers = [
            ...providers,
            NsDiConfigurator.configureAppLogo(config.appLogo)
         ];
      }

      return providers;
   }

   private static configureAuthentication<TAuthService extends NsAuthenticationApiService>(
      config: NsDiAuthenticationConfiguration<TAuthService>
   ): Provider[] {
      const service = nsObjectIsNullValue(config, 'service', NsNoAuthenticationApiService);
      const notFoundPageRequiresAuth = nsObjectIsNullValue(config, 'notFoundPageRequiresAuth', false);
      const navigateToLoginOnTokenExpiration = nsObjectIsNullValue(
         config,
         'navigateToLoginOnTokenExpiration',
         false
      );

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
