import { NsDateTime } from 'ns-js-utils';
import { NsNgClassBreakpoints } from '../../../ns-media-query-observer';
import { NsCalendarsMonthDayEntity } from './ns-calendars-month-day.entity';

export class NsCalendarsMonthDayModel {
   private readonly _date: NsDateTime;
   private readonly _dateString: string;
   private readonly _dateOnlyString: string;
   private readonly _day: number;
   private readonly _isSameMonthYear: boolean;
   private readonly _isWeekend: boolean;
   private readonly _weekDayNumberNgClass: NsNgClassBreakpoints;
   private _weekDayNgClass: NsNgClassBreakpoints;
   private _isSelected = false;
   private _data: NsCalendarsMonthDayEntity;

   get weekDayNumberNgClass(): NsNgClassBreakpoints {
      return this._weekDayNumberNgClass;
   }

   get weekDayNgClass(): NsNgClassBreakpoints {
      return this._weekDayNgClass;
   }

   get date(): NsDateTime {
      return this._date;
   }

   get dateString(): string {
      return this._dateString;
   }

   get dateOnlyString(): string {
      return this._dateOnlyString;
   }

   get day(): number {
      return this._day;
   }

   get isSameMonthYear(): boolean {
      return this._isSameMonthYear;
   }

   get isSelected(): boolean {
      return this._isSelected;
   }

   set isSelected(value: boolean) {
      if (this._isSelected !== value) {
         this._isSelected = value;
         this.updateWeekDayCssClass();
      }
   }

   get data(): NsCalendarsMonthDayEntity {
      return this._data;
   }

   set data(value: NsCalendarsMonthDayEntity) {
      this._data = value;
   }

   constructor(
      date: NsDateTime,
      isSameMonthYear: boolean
   ) {
      this._date = NsDateTime.clone(date);
      this._dateString = this._date.toString();
      this._dateOnlyString = this._date.toDateOnlyString();
      this._day = this._date.day;

      this._isSameMonthYear = isSameMonthYear;
      this._isWeekend = this._date.isWeekend;

      this.updateWeekDayCssClass();

      this._weekDayNumberNgClass = {
         all: [
            'week-row-day-number',
            this.isToday() ? 'today ns-primary-background' : '',
            this.isSameMonthYear ? '' : 'today-diff-month',
         ]
      };
   }

   private updateWeekDayCssClass() {
      const itemCss = this.isSameMonthYear ? 'ns-list-item' : '';

      const weekDayNgClass = [
         'week-row-day',
         this.isSameMonthYear ? '' : 'is-different-month',
         this.isSelected ? 'ns-list-item-selected' : itemCss,
         this._isWeekend ? 'is-weekend' : ''
      ];

      this._weekDayNgClass = {
         all: weekDayNgClass,
         xl: ['font-x-large', ...weekDayNgClass],
         lg: ['font-large', ...weekDayNgClass]
      };
   }

   isToday() {
      return this._date.isToday();
   }

   select(selectedDay: NsCalendarsMonthDayModel): NsCalendarsMonthDayModel {
      if (selectedDay._date.isSame(this._date)) {
         this.isSelected = true;
         return this;
      }

      return null;
   }

   isSame(other: NsCalendarsMonthDayModel): boolean {
      if (other == null) {
         return false;
      }

      return this._date.isSame(other._date);
   }

   isSameDate(date: NsDateTime): NsCalendarsMonthDayModel {
      return this._date.isSame(date)
             ? this
             : null;
   }
}
