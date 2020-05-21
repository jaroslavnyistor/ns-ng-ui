import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { nsIsNotNullOrEmpty } from '../../utils/helpers/strings/ns-helpers-strings';
import { NsNavigationService } from '../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../service-provider/ns-service-provider';
import { NsServiceProviderComponentModel } from '../service-provider/ns-service-provider-component.model';
import { NsDashboardItemEntity } from './ns-dashboard-item.entity';
import { NsDashboardItemModel } from './ns-dashboard-item.model';

export abstract class NsDashboardModel<TServiceProvider extends NsServiceProvider<TAppNavService>,
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
            switchMap(isLoggedIn => this.getDashboardItems$()
               .pipe(
                  map(entities => ({ isLoggedIn, entities }))
               ),
            ),
            map(({ isLoggedIn, entities }) => this.mapEntities(entities, isLoggedIn))
         );
   }

   protected abstract getDashboardItems$(): Observable<NsDashboardItemEntity[]>;

   private mapEntities(entities: NsDashboardItemEntity[], isLoggedIn: boolean): NsDashboardItemModel[] {
      return entities
         .filter(entity => NsDashboardModel.filterEntity(entity, isLoggedIn))
         .map((entity, idx) => new NsDashboardItemModel(
            idx + 1,
            entity,
            this.langService
            )
         );
   }

   private static filterEntity(entity: NsDashboardItemEntity, isLoggedIn: boolean): boolean {
      if (entity.requiresAuth === true) {
         return isLoggedIn;
      }

      if (entity.includeIf != null) {
         return entity.includeIf();
      }

      return true;
   }
}
