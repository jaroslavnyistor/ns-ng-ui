import { NsNavigationService } from 'nikisoft-utils';
import { NsServiceProvider } from '../service-provider/ns-service-provider';
import { NsServiceProviderComponentService } from '../service-provider/ns-service-provider-component.service';
import { NsDashboardModel } from './ns-dashboard.model';

export abstract class NsDashboardService<
  TModel extends NsDashboardModel<TServiceProvider, TAppNavService>,
  TServiceProvider extends NsServiceProvider<TAppNavService>,
  TAppNavService extends NsNavigationService
> extends NsServiceProviderComponentService<TModel, TServiceProvider, TAppNavService> {
  protected constructor(model: TModel, serviceProvider: TServiceProvider) {
    super(model, serviceProvider);
  }
}
