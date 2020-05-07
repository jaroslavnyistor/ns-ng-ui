import { Provider, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { NsApiResponseError } from '../../../utils/api/ns-api-response.error';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsServiceProviderComponentService } from '../../ns-service-provider-component.service';
import { NsCalendarsMonthDayEntity } from './days/ns-calendars-month-day.entity';
import { NsCalendarsMonthModel } from './ns-calendars-month.model';

export function provideCalendarsMonthService<TService extends NsCalendarsMonthService<any, any, any>,
   TModel extends NsCalendarsMonthModel<any, any>>(service: Type<TService>, model: Type<TModel>): Provider[] {
   return [
      service,
      { useExisting: service, provide: NsCalendarsMonthService },
      model,
      { useExisting: model, provide: NsCalendarsMonthModel }
   ];
}

export abstract class NsCalendarsMonthService<TModel extends NsCalendarsMonthModel<TServiceProvider, TAppNavService>,
   TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentService<TModel, TServiceProvider, TAppNavService> {

   get selectedDayData(): NsCalendarsMonthDayEntity {
      return this.model.selectedDayData;
   }

   set currentDate(value: string) {
      this.model.currentDate = value;
   }

   set selectedDate(value: string) {
      this.model.selectedDate = value;
   }

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model, serviceProvider);
   }

   onInit(): void {
      super.onInit();

      this.model.subscribeToCurrentDateChanges(() => this.handleDateChanged());
   }

   private handleDateChanged() {
      this.loadData();
   }

   private loadData() {
      this.subscribeTo(
         this.withLoading(this.getLoadDataObservable()),
         {
            next: data => this.handleDataLoaded(data),
            error: error => this.handleDataLoadFailed(error)
         }
      );
   }

   protected abstract getLoadDataObservable(): Observable<NsCalendarsMonthDayEntity[]>;

   private handleDataLoaded(data: NsCalendarsMonthDayEntity[]) {
      this.model.setData(data);
   }

   private handleDataLoadFailed(error: NsApiResponseError) {
      this.model.resolveApiError(error);
   }

   subscribeToCurrentDateChanges(callback: (date: string) => void) {
      this.model.subscribeToCurrentDateChanges(callback);
   }

   subscribeToSelectedDateChanges(callback: (selectedDate: string) => void) {
      this.model.subscribeToSelectedDateChanges(callback);
   }
}
