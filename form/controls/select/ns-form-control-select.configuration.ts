import { NsFormControlConfiguration } from '../ns-form-control.configuration';
import { NsFormControlSelectItemEntity } from './ns-form-control-select-item.entity';
import { NsFormControlSelectService } from './ns-form-control-select.service';

export interface NsFormControlSelectConfiguration<TSelectItem extends NsFormControlSelectItemEntity>
   extends NsFormControlConfiguration {

   textProperty: string;

   service: NsFormControlSelectService<TSelectItem>;
}
