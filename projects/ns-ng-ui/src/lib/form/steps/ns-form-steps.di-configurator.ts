import { Provider, Type } from '@angular/core';
import { NsFormStepsModel } from './ns-form-steps.model';
import { NsFormStepsService } from './ns-form-steps.service';

export class NsFormStepsDiConfigurator {
  static provideService<
    TService extends NsFormStepsService<any, any, any, any>,
    TModel extends NsFormStepsModel<any, any, any>
  >(service: Type<TService>, model: Type<TModel>): Provider[] {
    return [
      service,
      { useExisting: service, provide: NsFormStepsService },
      model,
      { useExisting: model, provide: NsFormStepsModel },
    ];
  }
}
