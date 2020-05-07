import { NsDateTime } from '../../../../utils/dates/ns-date-time';

export abstract class NsCalendarsMonthDayEntity {
   private readonly _date: string;

   get date(): string {
      return this._date;
   }

   protected constructor(date: string) {
      this._date = NsDateTime.from(date)
         .toDateOnlyString();
   }
}
