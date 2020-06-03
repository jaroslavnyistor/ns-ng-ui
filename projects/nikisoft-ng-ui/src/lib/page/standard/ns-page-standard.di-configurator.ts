import { Provider, Type } from '@angular/core';
import { NsPageStandardModel } from './ns-page-standard.model';
import { NsPageStandardService } from './ns-page-standard.service';

export class NsPageStandardDiConfigurator {
  static provideService<
    TService extends NsPageStandardService<any, any, any>,
    TModel extends NsPageStandardModel<any, any>
  >(service: Type<TService>, model: Type<TModel>): Provider[] {
    return [
      service,
      { useExisting: service, provide: NsPageStandardService },
      model,
      { useExisting: model, provide: NsPageStandardModel },
    ];
  }
}
