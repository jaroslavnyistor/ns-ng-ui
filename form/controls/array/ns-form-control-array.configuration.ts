import { NsNavigationService } from '../../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../../ns-service-provider';
import { NsFormControlConfiguration } from '../ns-form-control.configuration';
import { NsFormControlArrayItemEntity } from './ns-form-control-array-item.entity';
import { NsFormControlArrayItemModel } from './ns-form-control-array-item.model';
import { NsFormControlArrayService } from './ns-form-control-array.service';

export interface NsFormControlArrayConfiguration<TService extends NsFormControlArrayService<TArrayItem, TArrayItemEntity, TServiceProvider, TAppNavService>,
   TArrayItem extends NsFormControlArrayItemModel<TArrayItemEntity, TServiceProvider, TAppNavService>,
   TArrayItemEntity extends NsFormControlArrayItemEntity,
   TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsFormControlConfiguration {
   service: TService;
   canDeleteItems?: boolean;
}
