import { Provider } from '@angular/core';
import { DI_NS_NOT_FOUND_AUTH_REQUIRED } from './ns-page-not-found-auth.di-tokens';

export class NsPageNotFoundAuthDiConfigurator {
  static setPageNotFoundRequiresAuth(useValue: boolean): Provider {
    return { provide: DI_NS_NOT_FOUND_AUTH_REQUIRED, useValue };
  }
}
