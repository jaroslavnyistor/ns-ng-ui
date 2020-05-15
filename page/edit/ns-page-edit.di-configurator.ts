import { Provider, Type } from '@angular/core';
import { NsFormDiConfigurator } from '../../form/ns-form.di-configurator';
import { NsPageEditModel } from './ns-page-edit.model';
import { NsPageEditService } from './ns-page-edit.service';

export class NsPageEditDiConfigurator {
   static provideService<TService extends NsPageEditService<any, any, any, any>,
      TModel extends NsPageEditModel<any, any, any>>(
      service: Type<TService>,
      model: Type<TModel>
   ): Provider[] {
      return [
         service,
         { useExisting: service, provide: NsPageEditService },
         model,
         { useExisting: model, provide: NsPageEditModel },
         NsFormDiConfigurator.provideService(service, model)
      ];
   }
}
