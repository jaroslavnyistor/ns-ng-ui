import { NsString, NsNavigationService } from 'nikisoft-utils';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NsServiceProvider } from '../service-provider/ns-service-provider';
import { NsServiceProviderComponentModel } from '../service-provider/ns-service-provider-component.model';
import { NsDashboardItemEntity } from './ns-dashboard-item.entity';
import { NsDashboardItemModel } from './ns-dashboard-item.model';

export abstract class NsDashboardModel<
  TServiceProvider extends NsServiceProvider<TAppNavService>,
  TAppNavService extends NsNavigationService
> extends NsServiceProviderComponentModel<TServiceProvider, TAppNavService> {
  private _header = '';
  private _hasHeader = false;
  private _dashboardItems: NsDashboardItemEntity[];
  private _dashboardItems$: Observable<NsDashboardItemModel[]>;

  get header(): string {
    return this._header;
  }

  set header(value: string) {
    this._header = value;
    this._hasHeader = NsString.isNotNullOrEmpty(this._header);
  }

  get hasHeader(): boolean {
    return this._hasHeader;
  }

  get dashboardItems$(): Observable<NsDashboardItemModel[]> {
    return this._dashboardItems$;
  }

  protected constructor(serviceProvider: TServiceProvider) {
    super(serviceProvider);
  }

  onInit() {
    super.onInit();

    this._dashboardItems = this.getDashboardItems();

    this._dashboardItems$ = this.buildDashboardItems$();
  }

  protected abstract getDashboardItems(): NsDashboardItemEntity[];

  private buildDashboardItems$() {
    return this.authService.isLoggedIn$.pipe(switchMap((isLoggedIn) => of(this.mapEntities(isLoggedIn))));
  }

  private mapEntities(isLoggedIn: boolean): NsDashboardItemModel[] {
    return this._dashboardItems
      .filter((entity) => NsDashboardModel.filterEntity(entity, isLoggedIn))
      .map((entity, idx) => this.toModel(entity, idx));
  }

  private static filterEntity(entity: NsDashboardItemEntity, isLoggedIn: boolean): boolean {
    let result = true;

    if (entity.requiresAuth === true) {
      result = isLoggedIn;
    }

    if (entity.includeIf != null) {
      result = entity.includeIf();
    }

    return result;
  }

  private toModel(entity: NsDashboardItemEntity, id: number): NsDashboardItemModel {
    return new NsDashboardItemModel(id + 1, entity, this.langService);
  }
}
