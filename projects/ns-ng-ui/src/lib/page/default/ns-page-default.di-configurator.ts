import { Provider, Type } from '@angular/core';
import { NsPageDefaultModel } from './ns-page-default.model';
import { NsPageDefaultService } from './ns-page-default.service';

export class NsPageDefaultDiConfigurator {
  static provideService<
    TService extends NsPageDefaultService<any, any, any>,
    TModel extends NsPageDefaultModel<any, any>
  >(service: Type<TService>, model: Type<TModel>): Provider[] {
    return [
      service,
      { useExisting: service, provide: NsPageDefaultService },
      model,
      { useExisting: model, provide: NsPageDefaultModel },
    ];
  }
}
