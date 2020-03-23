import { FormGroup } from '@angular/forms';
import { NsFormGroupModel } from './ns-form-group.model';

export interface NsFormGroupConfiguration<TGroupEntity, TGroupModel extends NsFormGroupModel<TGroupEntity, any>> {
   key: string;
   entity?: TGroupEntity;
   formGroup?: FormGroup;
   factory: (config: NsFormGroupConfiguration<TGroupEntity, TGroupModel>) => TGroupModel;
}
