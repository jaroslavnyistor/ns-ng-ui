import { Provider, Type } from '@angular/core';
import { NsCalendarsMonthModel } from './ns-calendars-month.model';
import { NsCalendarsMonthService } from './ns-calendars-month.service';

export class NsCalendarsMonthDiConfigurator {
  static provideService<
    TService extends NsCalendarsMonthService<any, any, any>,
    TModel extends NsCalendarsMonthModel<any, any>
  >(service: Type<TService>, model: Type<TModel>): Provider[] {
    return [
      service,
      { useExisting: service, provide: NsCalendarsMonthService },
      model,
      { useExisting: model, provide: NsCalendarsMonthModel },
    ];
  }
}
