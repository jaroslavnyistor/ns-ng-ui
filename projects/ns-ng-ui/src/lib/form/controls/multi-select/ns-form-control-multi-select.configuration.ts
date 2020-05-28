import { NsFormControlConfiguration } from '../ns-form-control.configuration';
import { NsFormControlMultiSelectItemEntity } from './ns-form-control-multi-select-item.entity';
import { NsFormControlMultiSelectService } from './ns-form-control-multi-select.service';

export interface NsFormControlMultiSelectConfiguration<
  TService extends NsFormControlMultiSelectService<TMultiSelectItem>,
  TMultiSelectItem extends NsFormControlMultiSelectItemEntity
> extends NsFormControlConfiguration {
  textProperty: string;
  service: TService;
}
