import { Provider, Type } from '@angular/core';
import { NsFormModel } from './ns-form.model';
import { NsFormService } from './ns-form.service';

export class NsFormDiConfigurator {
  static provideService<TService extends NsFormService<any, any, any, any>, TModel extends NsFormModel<any, any, any>>(
    service: Type<TService>,
    model: Type<TModel>,
  ): Provider[] {
    return [
      service,
      { useExisting: service, provide: NsFormService },
      model,
      { useExisting: model, provide: NsFormModel },
    ];
  }
}
