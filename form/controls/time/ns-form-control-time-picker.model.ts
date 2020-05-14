import { FormControl } from '@angular/forms';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlTimePickerConfiguration } from './ns-form-control-time-picker.configuration';

export class NsFormControlTimePickerModel<TEntity>
   extends NsFormControlModel<TEntity, FormControl, NsFormControlTimePickerConfiguration> {

   get canChooseTime(): boolean {
      return !this.isDisabled;
   }

   constructor(config: NsFormControlTimePickerConfiguration) {
      super(new FormControl(), config);

      this.defaultValue = nsNull(config.defaultValue, null);
   }
}
