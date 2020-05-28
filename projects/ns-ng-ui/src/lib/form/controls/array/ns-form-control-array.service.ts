import { NsNavigationService } from 'ns-js-utils';
import { NsServiceProvider } from '../../../service-provider/ns-service-provider';
import { NsFormControlArrayItemEntity } from './ns-form-control-array-item.entity';
import { NsFormControlArrayItemModel } from './ns-form-control-array-item.model';

export abstract class NsFormControlArrayService<TFormArrayItemModel extends NsFormControlArrayItemModel<TFormArrayItemEntity, TServiceProvider, TAppNavService>,
   TFormArrayItemEntity extends NsFormControlArrayItemEntity,
   TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService> {

   abstract createNewEntity(lastItem: TFormArrayItemEntity): TFormArrayItemEntity;

   abstract mapEntityToFormModel(): TFormArrayItemModel;
}
