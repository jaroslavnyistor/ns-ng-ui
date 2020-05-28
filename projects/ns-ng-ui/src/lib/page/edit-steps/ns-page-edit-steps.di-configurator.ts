import { Provider, Type } from '@angular/core';
import { NsFormStepsDiConfigurator } from '../../form/steps/ns-form-steps.di-configurator';
import { NsPageEditStepsModel } from './ns-page-edit-steps.model';
import { NsPageEditStepsService } from './ns-page-edit-steps.service';

export class NsPageEditStepsDiConfigurator {
   static provideService<TService extends NsPageEditStepsService<any, any, any, any>,
      TModel extends NsPageEditStepsModel<any, any, any>>(
      service: Type<TService>,
      model: Type<TModel>
   ): Provider[] {
      return [
         service,
         { useExisting: service, provide: NsPageEditStepsService },
         model,
         { useExisting: model, provide: NsPageEditStepsModel },
         NsFormStepsDiConfigurator.provideService(service, model)
      ];
   }
}
