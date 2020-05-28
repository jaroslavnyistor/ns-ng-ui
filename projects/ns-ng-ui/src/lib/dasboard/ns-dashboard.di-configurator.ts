import { Provider, Type } from '@angular/core';
import { NsDashboardModel } from './ns-dashboard.model';
import { NsDashboardService } from './ns-dashboard.service';

export class NsDashboardDiConfigurator {
  static provideService<TService extends NsDashboardService<any, any, any>, TModel extends NsDashboardModel<any, any>>(
    service: Type<TService>,
    model: Type<TModel>,
  ): Provider[] {
    return [
      service,
      { useExisting: service, provide: NsDashboardService },
      model,
      { useExisting: model, provide: NsDashboardModel },
    ];
  }
}
