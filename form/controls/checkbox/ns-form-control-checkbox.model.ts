import { FormControl } from '@angular/forms';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlCheckboxConfiguration } from './ns-form-control-checkbox.configuration';

export class NsFormControlCheckboxModel<TEntity>
   extends NsFormControlModel<TEntity, FormControl, NsFormControlCheckboxConfiguration> {

   constructor(config: NsFormControlCheckboxConfiguration) {
      super(new FormControl(), config);

      this.defaultValue = nsNull(config.defaultValue, false);
   }
}
