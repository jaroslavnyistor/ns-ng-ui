import { Provider, Type } from '@angular/core';
import { NsDashboardService } from './ns-dashboard.service';

export class NsDashboardDiConfigurator {
   static provideService<TService extends NsDashboardService<any, any, any>>(service: Type<TService>): Provider[] {
      return [
         service,
         {
            useExisting: service,
            provide: NsDashboardService
         }
      ];
   }
}
