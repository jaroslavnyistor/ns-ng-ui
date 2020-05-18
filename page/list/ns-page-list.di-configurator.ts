import { Provider, Type } from '@angular/core';
import { NsPageListModel } from './ns-page-list.model';
import { NsPageListService } from './ns-page-list.service';

export class NsPageListDiConfigurator {
   static provideService<TService extends NsPageListService<any, any, any, any, any>,
      TModel extends NsPageListModel<any, any, any, any>>(
      service: Type<TService>,
      model: Type<TModel>
   ): Provider[] {
      return [
         service,
         { useExisting: service, provide: NsPageListService },
         model,
         { useExisting: model, provide: NsPageListModel }
      ];
   }
}
