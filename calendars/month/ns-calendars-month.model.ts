import { BehaviorSubject, Observable } from 'rxjs';
import { nsApiErrorMapper } from '../../../utils/api/error/ns-api-error.mapper';
import { NsApiResponseError } from '../../../utils/api/ns-api-response.error';
import { NsDate } from '../../../utils/dates/ns-date';
import { NsDateTime } from '../../../utils/dates/ns-date-time';
import { nsIsNotNullOrEmpty } from '../../../utils/helpers/strings/ns-helpers-strings';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsMediaQueryBreakpoint, NsMediaQueryBreakpointChanges } from '../../ns-media-query-observer';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsServiceProviderComponentModel } from '../../ns-service-provider-component.model';
import { NsCalendarsMonthDayCollection } from './days/ns-calendars-month-day.collection';
import { NsCalendarsMonthDayEntity } from './days/ns-calendars-month-day.entity';
import { NsCalendarsMonthDayModel } from './days/ns-calendars-month-day.model';
import { NsCalendarsMonthWeekModel } from './days/ns-calendars-month-week.model';
import { NsCalendarsMonthLoadRequestBuilder } from './ns-calendars-month-load-request.builder';

export abstract class NsCalendarsMonthModel<TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentModel<TServiceProvider, TAppNavService> {

   private _weekDayNamesMediaQueryBreakpoints: NsMediaQueryBreakpointChanges;
   private readonly _weekDayNames$: BehaviorSubject<string[]>;
   private readonly _days: NsCalendarsMonthDayCollection;
   private _errorMessages = [];
   private _isRightPanelOpened = false;

   get weekDayNames$(): Observable<string[]> {
      return this._weekDayNames$;
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
      private readonly _apiErrorMapper: any = nsApiErrorMapper,
   ) {
      super(serviceProvider);

      this._weekDayNames$ = new BehaviorSubject<string[]>([]);
      this._days = new NsCalendarsMonthDayCollection();

      this.configureWeekDayNamesMediaQueryBreakpoints();
   }

   private configureWeekDayNamesMediaQueryBreakpoints() {
      this._weekDayNamesMediaQueryBreakpoints = {
         [NsMediaQueryBreakpoint.LessThanMedium]: () => this._weekDayNames$.next(NsDate.weekdaysMin()),
         [NsMediaQueryBreakpoint.LessThanLarge]: () => this._weekDayNames$.next(NsDate.weekdaysShort()),
         [NsMediaQueryBreakpoint.Default]: () => this._weekDayNames$.next(NsDate.weekdays())
      };
   }

   onInit() {
      super.onInit();

      const mediaQueryObserver = this.mediaQueryObserver;

      this.subscribeTo(
         mediaQueryObserver.mediaChanges,
         {
            next: mediaChanges => mediaQueryObserver.resolve(this._weekDayNamesMediaQueryBreakpoints, mediaChanges)
         }
      );
   }

   resolveApiError(error: NsApiResponseError) {
      this.errorMessages = this.apiErrorResolverService.resolve(
         this._apiErrorMapper,
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
