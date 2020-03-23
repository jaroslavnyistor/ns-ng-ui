import { NsServiceProvider } from '../../../ns-service-provider';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControlArrayItemEntity } from './ns-form-control-array-item.entity';

export abstract class NsFormControlArrayItemModel<TEntity extends NsFormControlArrayItemEntity,
   TServiceProvider extends NsServiceProvider>
   extends NsFormModel<TEntity, TServiceProvider> {

   protected constructor(entity: TEntity, serviceProvider: TServiceProvider) {
      super(entity, serviceProvider);
   }
}
