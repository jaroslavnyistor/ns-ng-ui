import { InjectionToken, Provider } from '@angular/core';

export const DI_NS_APP_LOGO = new InjectionToken<string>('DI_NS_APP_LOGO', {
   providedIn: 'root',
   factory: () => ''
});

export function setApplicationLogo(useValue: string): Provider {
   return {
      provide: DI_NS_APP_LOGO,
      useValue
   };
}

export const DI_NS_VERSION = new InjectionToken<string>('DI_NS_VERSION', {
   providedIn: 'root',
   factory: () => '0.0.0.0'
});

export function setApplicationVersion(useValue: string): Provider {
   return {
      provide: DI_NS_VERSION,
      useValue
   };
}

