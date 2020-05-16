import { NsNavigationService } from '../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../ns-service-provider';
import { NsServiceProviderComponentService } from '../ns-service-provider-component.service';
import { NsDashboardItemModel } from './ns-dashboard-item.model';
import { NsDashboardModel } from './ns-dashboard.model';

export abstract class NsDashboardService<TModel extends NsDashboardModel<TServiceProvider, TAppNavService>,
   TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentService<TModel, TServiceProvider, TAppNavService> {

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model, serviceProvider);
   }

   handleItemClicked(item: NsDashboardItemModel) {
      this.navService.toUrl(item.route);
   }
}
