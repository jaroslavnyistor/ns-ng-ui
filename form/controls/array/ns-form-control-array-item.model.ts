import { NsNavigationService } from '../../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../../ns-service-provider';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControlArrayItemEntity } from './ns-form-control-array-item.entity';

export abstract class NsFormControlArrayItemModel<TEntity extends NsFormControlArrayItemEntity,
   TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsFormModel<TEntity, TServiceProvider, TAppNavService> {

   protected constructor(entity: TEntity, serviceProvider: TServiceProvider) {
      super(entity, serviceProvider);
   }
}
