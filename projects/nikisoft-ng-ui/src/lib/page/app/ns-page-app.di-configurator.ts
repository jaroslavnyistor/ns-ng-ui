import { Provider, Type } from '@angular/core';
import { NsPageAppModel } from './ns-page-app.model';
import { NsPageAppService } from './ns-page-app.service';

export class NsPageAppDiConfigurator {
  static provideService<TService extends NsPageAppService<any, any, any>, TModel extends NsPageAppModel<any, any>>(
    service: Type<TService>,
    model: Type<TModel>,
  ): Provider[] {
    return [
      service,
      { useExisting: service, provide: NsPageAppService },
      model,
      { useExisting: model, provide: NsPageAppModel },
    ];
  }
}
