import { Provider, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { NsApiResponseError } from '../../../utils/api/ns-api-response.error';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsServiceProviderComponentService } from '../../ns-service-provider-component.service';
import { NsCalendarsMonthDayEntity } from './days/ns-calendars-month-day.entity';
import { NsCalendarsMonthModel } from './ns-calendars-month.model';

export function registerCalendarsMonthService<TService extends NsCalendarsMonthService<any, any, any>>(
   service: Type<TService>): Provider[] {
   return [
      service,
      {
         useExisting: service,
         provide: NsCalendarsMonthService
      }
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

      this.buildDaysHeader();

      this.model.subscribeToCurrentDateChanges(() => this.handleDateChanged());
   }

   private buildDaysHeader() {
      this.model.weekDayNames = [
         this.langService.translate(LocalizedTextIdNikisoft.Monday),
         this.langService.translate(LocalizedTextIdNikisoft.Tuesday),
         this.langService.translate(LocalizedTextIdNikisoft.Wednesday),
         this.langService.translate(LocalizedTextIdNikisoft.Thursday),
         this.langService.translate(LocalizedTextIdNikisoft.Friday),
         this.langService.translate(LocalizedTextIdNikisoft.Saturday),
         this.langService.translate(LocalizedTextIdNikisoft.Sunday),
      ];
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
