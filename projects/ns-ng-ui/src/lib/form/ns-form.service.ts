import { NsNavigationService } from 'ns-js-utils';
import { NsServiceProvider } from '../service-provider/ns-service-provider';
import { NsServiceProviderComponentService } from '../service-provider/ns-service-provider-component.service';
import { NsFormModel } from './ns-form.model';

export abstract class NsFormService<TModel extends NsFormModel<TEntity, TServiceProvider, TAppNavService>,
   TEntity,
   TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentService<TModel, TServiceProvider, TAppNavService> {

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model, serviceProvider);
   }
}
