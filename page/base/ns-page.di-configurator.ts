import { Provider, Type } from '@angular/core';
import { NsPageModel } from './ns-page.model';
import { NsPageService } from './ns-page.service';

export class NsPageDiConfigurator {
   static provideService<TService extends NsPageService<any, any, any>,
      TModel extends NsPageModel<any, any>>(service: Type<TService>, model: Type<TModel>): Provider[] {
      return [
         service,
         { useExisting: service, provide: NsPageService },
         model,
         { useExisting: model, provide: NsPageModel },
      ];
   }
}
