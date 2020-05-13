import { APP_INITIALIZER, InjectionToken, Provider, Type } from '@angular/core';
import { DI_NS_AUTHENTICATION_API_SERVICE } from '../utils/authentication/ns-authenticate.service';
import { NsAuthenticationApiService } from '../utils/authentication/ns-authentication-api.service';
import {
   DI_NS_DEFAULT_LANGUAGE,
   LocalizationLanguagesService,
   localizationLanguagesServiceAppInitializer
} from '../utils/localization/localization-languages.service';
import { LocalizationLanguage } from '../utils/localization/localization.language';
import { NsNavigationService } from '../utils/navigation/ns-navigation.service';
import { DI_NS_STORAGE_KEY_PREFIX } from '../utils/storage/ns-storage.service';
import { NsServiceProvider } from './ns-service-provider';

export interface NsDiServiceProviderConfiguration<TServiceProvider extends NsServiceProvider, TNavService extends NsNavigationService> {
   service: Type<TServiceProvider>,
   navService: Type<TNavService>
}

export interface NsDiConfiguration<TAuthService extends NsAuthenticationApiService,
   TServiceProvider extends NsServiceProvider, TNavService extends NsNavigationService> {
   storageKeyPrefix: string;
   defaultLanguage: LocalizationLanguage,
   authService: Type<TAuthService>,
   serviceProvider: NsDiServiceProviderConfiguration<TServiceProvider, TNavService>,
   appVersion: string,
   appLogo?: string,
}

export const DI_NS_APP_LOGO = new InjectionToken<string>('DI_NS_APP_LOGO', {
   providedIn: 'root',
   factory: () => ''
});
export const DI_NS_VERSION = new InjectionToken<string>('DI_NS_VERSION');

export function configureDi<TAuthService extends NsAuthenticationApiService,
   TServiceProvider extends NsServiceProvider, TNavService extends NsNavigationService>(
   config: NsDiConfiguration<TAuthService, TServiceProvider, TNavService>)
   : Provider[] {
   const providers: Provider[] = [
      { provide: DI_NS_STORAGE_KEY_PREFIX, useValue: config.storageKeyPrefix },
      {
         provide: APP_INITIALIZER,
         useFactory: localizationLanguagesServiceAppInitializer,
         deps: [LocalizationLanguagesService],
         multi: true
      },
      { provide: DI_NS_DEFAULT_LANGUAGE, useValue: config.defaultLanguage },
      { provide: DI_NS_AUTHENTICATION_API_SERVICE, useClass: config.authService },
      config.serviceProvider.service,
      { useExisting: config.serviceProvider.service, provide: NsServiceProvider },
      config.serviceProvider.navService,
      { useExisting: config.serviceProvider.navService, provide: NsNavigationService },
      { provide: DI_NS_VERSION, useValue: config.appVersion },
   ];

   if (config.appLogo) {
      providers.push({
         provide: DI_NS_APP_LOGO,
         useValue: config.appLogo
      });
   }

   return providers;
}
