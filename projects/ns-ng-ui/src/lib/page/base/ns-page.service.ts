import { NsNavigationService } from 'ns-js-utils';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsServiceProviderComponentService } from '../../service-provider/ns-service-provider-component.service';
import { NsPageModel } from './ns-page.model';

export abstract class NsPageService<TModel extends NsPageModel<TServiceProvider, TAppNavService>,
   TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentService<TModel, TServiceProvider, TAppNavService> {

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model, serviceProvider);
   }
}
