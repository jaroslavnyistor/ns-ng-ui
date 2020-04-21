import { BehaviorSubject, Observable } from 'rxjs';
import { NsApiErrorResolverService } from '../../../utils/api/error/ns-api-error-resolver.service';
import { nsApiErrorMapper } from '../../../utils/api/error/ns-api-error.mapper';
import { NsApiResponseError } from '../../../utils/api/ns-api-response.error';
import { NsDateTime } from '../../../utils/dates/ns-date-time';
import { nsIsNotNullOrEmpty } from '../../../utils/helpers/strings/ns-helpers-strings';
import { LocalizationLanguagesService } from '../../../utils/localization/localization-languages.service';
import { NsComponentModel } from '../../component/ns-component.model';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsCalendarsMonthDayCollection } from './days/ns-calendars-month-day.collection';
import { NsCalendarsMonthDayEntity } from './days/ns-calendars-month-day.entity';
import { NsCalendarsMonthDayModel } from './days/ns-calendars-month-day.model';
import { NsCalendarsMonthWeekModel } from './days/ns-calendars-month-week.model';
import { NsCalendarsMonthLoadRequestBuilder } from './ns-calendars-month-load-request.builder';

export abstract class NsCalendarsMonthModel<TServiceProvider extends NsServiceProvider>
   extends NsComponentModel {

   private readonly _serviceProvider: TServiceProvider;
   private readonly _weekDayNames$: BehaviorSubject<string[]>;
   private readonly _days: NsCalendarsMonthDayCollection;
   private _errorMessages = [];
   private _isRightPanelOpened = false;

   protected get langService(): LocalizationLanguagesService {
      return this._serviceProvider.langService;
   }

   protected get apiErrorResolverService(): NsApiErrorResolverService {
      return this._serviceProvider.apiErrorResolverService;
   }

   get weekDayNames$(): Observable<string[]> {
      return this._weekDayNames$;
   }

   set weekDayNames(value: string[]) {
      this._weekDayNames$.next(value);
   }

   get headerDate(): string {
      return this._days.headerDate;
   }

   get weeks$(): Observable<NsCalendarsMonthWeekModel[]> {
      return this._days.weeks$;
   }

   get hasSelectedDayData(): boolean {
      return this._days.hasSelectedDayData;
   }

   get isDateSelected(): boolean {
      return this._days.isDateSelected;
   }

   get currentDate(): string {
      return this._days.currentDate;
   }

   set currentDate(value: string) {
      this._days.setDateFromString(value);
   }

   get selectedDayData(): NsCalendarsMonthDayEntity {
      return this._days.selectedDayData;
   }

   get selectedDate(): string {
      return this._days.selectedDate;
   }

   set selectedDate(value: string) {
      let day = null;

      if (nsIsNotNullOrEmpty(value)) {
         day = this._days.find(NsDateTime.from(value));
      }

      this._days.handleSelected(day);
   }

   get errorMessages(): string[] {
      return this._errorMessages;
   }

   set errorMessages(value: string[]) {
      this._errorMessages = value;
   }

   get isRightPanelOpened(): boolean {
      return this._isRightPanelOpened;
   }

   set isRightPanelOpened(value: boolean) {
      this._isRightPanelOpened = value;
   }

   protected constructor(
      serviceProvider: TServiceProvider,
      private readonly _serverApiErrorMapper?: any
   ) {
      super();

      this._serviceProvider = serviceProvider;

      this._weekDayNames$ = new BehaviorSubject<string[]>([]);
      this._days = new NsCalendarsMonthDayCollection();

      if (_serverApiErrorMapper == null) {
         this._serverApiErrorMapper = nsApiErrorMapper;
      }
   }

   resolveApiError(error: NsApiResponseError) {
      this.errorMessages = this.apiErrorResolverService.resolve(
         this._serverApiErrorMapper,
         this.langService,
         error
      );
   }

   fillRequestArguments(builder: NsCalendarsMonthLoadRequestBuilder) {
      builder.value({
         fromDate: this._days.fromDate,
         tillDate: this._days.tillDate,
      });
   }

   moveDateBack() {
      this._days.moveDateBack();
   }

   moveToNow() {
      this._days.moveToNow();
   }

   moveDateForward() {
      this._days.moveDateForward();
   }

   reloadData() {
      this._days.reloadData();
   }

   handleSelected(day: NsCalendarsMonthDayModel) {
      this._days.handleSelected(day);
   }

   setData(data: NsCalendarsMonthDayEntity[]) {
      this._days.setData(data);
   }

   subscribeToCurrentDateChanges(callback: (date: string) => void) {
      this.subscribeTo(
         this._days.currentDate$,
         {
            next: date => callback(date)
         }
      );
   }

   subscribeToSelectedDateChanges(callback: (selectedDate: string) => void) {
      this.subscribeTo(
         this._days.selectedDate$,
         {
            next: date => callback(date)
         }
      );
   }
}
