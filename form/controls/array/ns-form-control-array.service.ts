import { NsNavigationService } from '../../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../../service-provider/ns-service-provider';
import { NsFormControlArrayItemEntity } from './ns-form-control-array-item.entity';
import { NsFormControlArrayItemModel } from './ns-form-control-array-item.model';

export abstract class NsFormControlArrayService<
   TArrayItem extends NsFormControlArrayItemModel<TArrayItemEntity, TServiceProvider, TAppNavService>,
   TArrayItemEntity extends NsFormControlArrayItemEntity,
   TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService> {

   abstract createNewEntity(lastItem: TArrayItemEntity): TArrayItemEntity;

   abstract mapEntityToFormModel(entity: TArrayItemEntity): TArrayItem;
}
