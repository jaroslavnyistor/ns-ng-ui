import { NsComponentService } from '../component/ns-component.service';
import { NsServiceProvider } from '../ns-service-provider';
import { NsDashboardItemEntity } from './ns-dashboard-item.entity';
import { NsDashboardItemModel } from './ns-dashboard-item.model';
import { NsDashboardModel } from './ns-dashboard.model';

export abstract class NsDashboardService<TModel extends NsDashboardModel, TServiceProvider extends NsServiceProvider>
   extends NsComponentService<TModel> {
   protected readonly _serviceProvider: TServiceProvider;

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model);
      this._serviceProvider = serviceProvider;
   }

   onInit(): void {
      super.onInit();

      this.model.items = this.getItems();
   }

   protected abstract getItems(): NsDashboardItemEntity[];

   handleItemClicked(item: NsDashboardItemModel) {
      this._serviceProvider.navService.toUrl(item.route);
   }
}
