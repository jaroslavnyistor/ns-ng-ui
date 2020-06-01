import { NsNavigationService } from 'ns-js-utils';
import { NsServiceProvider } from '../../../service-provider/ns-service-provider';
import { NsFormControlConfiguration } from '../ns-form-control.configuration';
import { NsFormControlArrayItemEntity } from './ns-form-control-array-item.entity';
import { NsFormControlArrayItemModel } from './ns-form-control-array-item.model';
import { NsFormControlArrayService } from './ns-form-control-array.service';

export interface NsFormControlArrayConfiguration<
  TService extends NsFormControlArrayService<
    TFormArrayItemModel,
    TFormArrayItemEntity,
    TServiceProvider,
    TAppNavService
  >,
  TFormArrayItemModel extends NsFormControlArrayItemModel<TFormArrayItemEntity, TServiceProvider, TAppNavService>,
  TFormArrayItemEntity extends NsFormControlArrayItemEntity,
  TServiceProvider extends NsServiceProvider<TAppNavService>,
  TAppNavService extends NsNavigationService
> extends NsFormControlConfiguration {
  service: TService;
  canDeleteItems?: boolean;
}
