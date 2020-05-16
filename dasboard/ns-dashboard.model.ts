import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { nsIsNotNullOrEmpty } from '../../utils/helpers/strings/ns-helpers-strings';
import { NsNavigationService } from '../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../ns-service-provider';
import { NsServiceProviderComponentModel } from '../ns-service-provider-component.model';
import { NsDashboardItemEntity } from './ns-dashboard-item.entity';
import { NsDashboardItemModel } from './ns-dashboard-item.model';

export abstract class NsDashboardModel <TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentModel<TServiceProvider, TAppNavService> {

   private _header = '';
   private _hasHeader = false;

   get header(): string {
      return this._header;
   }

   set header(value: string) {
      this._header = value;
      this._hasHeader = nsIsNotNullOrEmpty(this._header);
   }

   get hasHeader(): boolean {
      return this._hasHeader;
   }

   private readonly _dashboardItems$: Observable<NsDashboardItemModel[]>;

   get dashboardItems$(): Observable<NsDashboardItemModel[]> {
      return this._dashboardItems$;
   }

   protected constructor(serviceProvider: TServiceProvider) {
      super(serviceProvider);

      this._dashboardItems$ = this.buildDashboardItems$();
   }

   private buildDashboardItems$() {
      return this.authService.isLoggedIn$
         .pipe(
            flatMap(isLoggedIn => this.getDashboardItems$(isLoggedIn)),
            map(entities => entities.map(entity => new NsDashboardItemModel(entity)))
         );
   }

   protected abstract getDashboardItems$(isLoggedIn: boolean): Observable<NsDashboardItemEntity[]>;

}
