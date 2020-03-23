import { InjectionToken } from '@angular/core';

export const DI_NS_APP_LOGO = new InjectionToken<string>('DI_NS_APP_LOGO', {
   providedIn: 'root',
   factory: () => ''
});
