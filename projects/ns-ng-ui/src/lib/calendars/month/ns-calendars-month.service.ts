import { NsApiResponseError, NsNavigationService } from 'ns-js-utils';
import { Observable } from 'rxjs';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsServiceProviderComponentService } from '../../service-provider/ns-service-provider-component.service';
import { NsCalendarsMonthDayEntity } from './days/ns-calendars-month-day.entity';
import { NsCalendarsMonthModel } from './ns-calendars-month.model';

export abstract class NsCalendarsMonthService<
  TModel extends NsCalendarsMonthModel<TServiceProvider, TAppNavService>,
  TServiceProvider extends NsServiceProvider<TAppNavService>,
  TAppNavService extends NsNavigationService
> extends NsServiceProviderComponentService<TModel, TServiceProvider, TAppNavService> {
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
    this.subscribeTo(this.withLoading(this.getLoadDataObservable()), {
      next: (data) => this.handleDataLoaded(data),
      error: (error) => this.handleDataLoadFailed(error),
    });
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
