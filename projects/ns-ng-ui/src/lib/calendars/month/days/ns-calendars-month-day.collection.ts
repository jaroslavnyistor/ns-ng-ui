import { NsDateTime, nsIsNotNullOrEmpty, nsIsNullOrEmpty, NsMap } from 'ns-js-utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { NsCalendarsMonthDayEntity } from './ns-calendars-month-day.entity';
import { NsCalendarsMonthDayModel } from './ns-calendars-month-day.model';
import { NsCalendarsMonthWeekModel } from './ns-calendars-month-week.model';

const CALENDAR_ROWS = 6;
const CALENDAR_COLUMNS = 7;

export class NsCalendarsMonthDayCollection {
  private readonly _weeks$: BehaviorSubject<NsCalendarsMonthWeekModel[]>;
  private readonly _currentDate$: BehaviorSubject<string>;
  private readonly _selectedDate$: BehaviorSubject<string>;
  private _currentDate: NsDateTime;
  private _selectedDay: NsCalendarsMonthDayModel;
  private _headerDate: string;
  private _fromDate: string;
  private _tillDate: string;

  get weeks$(): Observable<NsCalendarsMonthWeekModel[]> {
    return this._weeks$;
  }

  get currentDate(): string {
    return this._currentDate$.value;
  }

  get currentDate$(): Observable<string> {
    return this._currentDate$;
  }

  get isDateSelected(): boolean {
    return nsIsNotNullOrEmpty(this.selectedDate);
  }

  get selectedDate$(): BehaviorSubject<string> {
    return this._selectedDate$;
  }

  get selectedDate(): string {
    return this._selectedDay == null ? null : this._selectedDay.dateString;
  }

  get hasSelectedDayData(): boolean {
    return this.selectedDayData != null;
  }

  get selectedDayData(): NsCalendarsMonthDayEntity {
    return this._selectedDay == null ? null : this._selectedDay.data;
  }

  get headerDate(): string {
    return this._headerDate;
  }

  get fromDate(): string {
    return this._fromDate;
  }

  get tillDate(): string {
    return this._tillDate;
  }

  constructor() {
    this._weeks$ = new BehaviorSubject<NsCalendarsMonthWeekModel[]>([]);
    this._currentDate$ = new BehaviorSubject<string>(null);
    this._selectedDate$ = new BehaviorSubject<string>(null);

    this.setDate(NsDateTime.now().setBeginOfDay());
  }

  setDateFromString(newDate: string) {
    if (nsIsNullOrEmpty(newDate)) {
      return;
    }

    this.setDate(NsDateTime.from(newDate));
  }

  setDate(newDate: NsDateTime) {
    if (this._currentDate != null && this._currentDate.isSame(newDate)) {
      return;
    }

    this._currentDate = NsDateTime.clone(newDate).toStartOfMonth();

    this._fromDate = NsDateTime.clone(this._currentDate).toStartOfMonth().toString();

    this._tillDate = NsDateTime.clone(this._currentDate).toEndOfMonth().toEndOfDay().toString();

    this.buildWeeks();

    this._headerDate = NsDateTime.formatLongMonthFullYear(this._currentDate);

    this._selectedDay = null;

    this.notifyCurrentDateChanged();
  }

  private notifyCurrentDateChanged() {
    this._currentDate$.next(this._currentDate.toString());
  }

  private buildWeeks() {
    let date = NsDateTime.clone(this._currentDate).toStartOfWeek();

    const weeks = [];
    for (let week = 0; week < CALENDAR_ROWS; week++) {
      const days = [];

      for (let day = 0; day < CALENDAR_COLUMNS; day++) {
        const isSameMonthYear = this._currentDate.isSameMonthYear(date);
        const montWeekDay = new NsCalendarsMonthDayModel(date, isSameMonthYear);
        days.push(montWeekDay);

        date = date.addDays(1);
      }

      const monthWeek = new NsCalendarsMonthWeekModel(days);
      weeks.push(monthWeek);
    }

    this._weeks$.next(weeks);
  }

  moveDateBack() {
    const date = NsDateTime.clone(this._currentDate).addMonths(-1);

    this.setDate(date);
  }

  moveToNow() {
    const date = NsDateTime.now().setBeginOfDay();

    if (date.isSameMonthYear(this._currentDate)) {
      return;
    }

    this.setDate(date);
  }

  moveDateForward() {
    const date = NsDateTime.clone(this._currentDate).addMonths(1);

    this.setDate(date);
  }

  reloadData() {
    this.notifyCurrentDateChanged();
  }

  handleSelected(day: NsCalendarsMonthDayModel) {
    this.selectDay(day);

    this._selectedDate$.next(this.selectedDate);
  }

  private selectDay(day: NsCalendarsMonthDayModel) {
    if (day != null && !day.isSameMonthYear) {
      return;
    }

    if (this._selectedDay != null) {
      this._selectedDay.isSelected = false;
    }

    if (day == null || (day.isSame(this._selectedDay) && day === this._selectedDay)) {
      this._selectedDay = null;
    } else {
      this._selectedDay = day;
      this._selectedDay.isSelected = true;
    }
  }

  setData(data: NsCalendarsMonthDayEntity[]) {
    const calendarData = new NsMap<string, NsCalendarsMonthDayEntity>();
    calendarData.initializeFromArray(data, (item) => item.date);

    this._weeks$.value.forEach((week) => week.setData(calendarData));
  }

  find(date: NsDateTime): NsCalendarsMonthDayModel {
    let found: NsCalendarsMonthDayModel = null;

    this._weeks$.value.some((week) => {
      found = week.find(date);
      return found != null;
    });

    return found;
  }
}
