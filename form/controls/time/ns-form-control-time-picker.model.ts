import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlTimePickerConfiguration } from './ns-form-control-time-picker.configuration';

export class NsFormControlTimePickerModel<TEntity>
   extends NsFormControlModel<TEntity, NsFormControlTimePickerModel<TEntity>, NsFormControl> {

   get canChooseTime(): boolean {
      return !this.isDisabled;
   }

   constructor(parent: NsFormModel<TEntity, any>,
               config: NsFormControlTimePickerConfiguration
   ) {
      super(parent, config);

      this.defaultValue = nsNull(config.defaultValue, null);
   }
}
