import { BehaviorSubject, Observable } from 'rxjs';
import { NsDateTime } from '../../../../utils/dates/ns-date-time';
import { NsMap } from '../../../../utils/map/ns-map';
import { NsCalendarsMonthDayEntity } from './ns-calendars-month-day.entity';
import { NsCalendarsMonthDayModel } from './ns-calendars-month-day.model';

export class NsCalendarsMonthWeekModel {
   private readonly _days$: BehaviorSubject<NsCalendarsMonthDayModel[]>;

   get days$(): Observable<NsCalendarsMonthDayModel[]> {
      return this._days$;
   }

   constructor(days: NsCalendarsMonthDayModel[]) {
      this._days$ = new BehaviorSubject<NsCalendarsMonthDayModel[]>(days);
   }

   setData(calendarData: NsMap<string, NsCalendarsMonthDayEntity>) {
      this._days$.value.forEach(day => {
         const date = day.dateOnlyString;
         day.data = calendarData.get(date);
      });
   }

   find(date: NsDateTime) {
      let found: NsCalendarsMonthDayModel = null;

      this._days$.value
      .some(day => {
         found = day.isSameDate(date);
         return found != null;
      });

      return found;
   }
}
