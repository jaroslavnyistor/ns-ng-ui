import { NsFormControlConfiguration } from '../ns-form-control.configuration';
import { NsFormControlSelectItemEntity } from './ns-form-control-select-item.entity';
import { NsFormControlSelectService } from './ns-form-control-select.service';

export interface NsFormControlSelectConfiguration<
  TService extends NsFormControlSelectService<TSelectItem>,
  TSelectItem extends NsFormControlSelectItemEntity
> extends NsFormControlConfiguration {
  textProperty: string;
  service: TService;
}
