import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlTimePickerConfiguration } from './ns-form-control-time-picker.configuration';

export class NsFormControlTimePickerModel<TEntity>
   extends NsFormControlModel<TEntity, NsFormControl, NsFormControlTimePickerConfiguration> {

   get canChooseTime(): boolean {
      return !this.isDisabled;
   }

   constructor(config: NsFormControlTimePickerConfiguration) {
      super(config);

      this.defaultValue = nsNull(config.defaultValue, null);
   }
}
