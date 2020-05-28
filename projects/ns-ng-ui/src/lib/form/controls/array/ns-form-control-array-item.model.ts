import { NsNavigationService } from '../../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../../service-provider/ns-service-provider';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControlArrayItemEntity } from './ns-form-control-array-item.entity';

export abstract class NsFormControlArrayItemModel<TEntity extends NsFormControlArrayItemEntity,
   TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService>
   extends NsFormModel<TEntity, TServiceProvider, TAppNavService> {

   protected constructor(serviceProvider: TServiceProvider, entity: TEntity) {
      super(serviceProvider, entity);
   }
}
