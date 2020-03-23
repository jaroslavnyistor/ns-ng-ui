import { NsServiceProvider } from '../../../ns-service-provider';
import { NsFormControlArrayItemEntity } from './ns-form-control-array-item.entity';
import { NsFormControlArrayItemModel } from './ns-form-control-array-item.model';

export abstract class NsFormControlArrayService<TArrayItem extends NsFormControlArrayItemModel<TArrayItemEntity, TServiceProvider>,
   TArrayItemEntity extends NsFormControlArrayItemEntity,
   TServiceProvider extends NsServiceProvider> {

   abstract mapEntityToFormModel(entity: TArrayItemEntity): TArrayItem;

   abstract createNewEntity(lastItem: TArrayItemEntity): TArrayItemEntity;
}
