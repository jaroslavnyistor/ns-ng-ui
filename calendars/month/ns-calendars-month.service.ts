import { Observable } from 'rxjs';
import { NsApiResponseError } from '../../../utils/api/ns-api-response.error';
import { NsAuthenticateService } from '../../../utils/authentication/ns-authenticate.service';
import { LocalizationLanguagesService } from '../../../utils/localization/localization-languages.service';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsComponentService } from '../../component/ns-component.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsCalendarsMonthDayEntity } from './days/ns-calendars-month-day.entity';
import { NsCalendarsMonthModel } from './ns-calendars-month.model';

export abstract class NsCalendarsMonthService<TModel extends NsCalendarsMonthModel<TServiceProvider>,
   TServiceProvider extends NsServiceProvider>
   extends NsComponentService<TModel> {
   protected readonly _serviceProvider: TServiceProvider;

   protected get langService(): LocalizationLanguagesService {
      return this._serviceProvider.langService;
   }

   protected get authService(): NsAuthenticateService {
      return this._serviceProvider.authService;
   }

   get selectedDayData(): NsCalendarsMonthDayEntity {
      return this.model.selectedDayData;
   }

   set currentDate(value: string) {
      this.model.currentDate = value;
   }

   set selectedDate(value: string) {
      this.model.selectedDate = value;
   }

   protected constructor(
      model: TModel,
      serviceProvider: TServiceProvider
   ) {
      super(model);

      this._serviceProvider = serviceProvider;
   }

   onInit(): void {
      super.onInit();

      this.buildDaysHeader();

      this.model.subscribeToCurrentDateChanges(() => this.handleDateChanged());
   }

   private buildDaysHeader() {
      this.model.weekDayNames = [
         this.langService.text(LocalizedTextIdNikisoft.Monday),
         this.langService.text(LocalizedTextIdNikisoft.Tuesday),
         this.langService.text(LocalizedTextIdNikisoft.Wednesday),
         this.langService.text(LocalizedTextIdNikisoft.Thursday),
         this.langService.text(LocalizedTextIdNikisoft.Friday),
         this.langService.text(LocalizedTextIdNikisoft.Saturday),
         this.langService.text(LocalizedTextIdNikisoft.Sunday),
      ];
   }

   private handleDateChanged() {
      this.loadData();
   }

   private loadData() {
      this.addSubscription(
         this.withLoading(this.getLoadDataObservable())
         .subscribe({
            next: data => this.handleDataLoaded(data),
            error: error => this.handleDataLoadFailed(error)
         })
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
