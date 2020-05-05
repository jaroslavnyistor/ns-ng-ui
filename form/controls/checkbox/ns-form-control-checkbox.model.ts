import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlCheckboxConfiguration } from './ns-form-control-checkbox.configuration';

export class NsFormControlCheckboxModel<TEntity>
   extends NsFormControlModel<TEntity, NsFormControlCheckboxModel<TEntity>, NsFormControl> {

   constructor(parent: NsFormModel<TEntity, any, any>,
               config: NsFormControlCheckboxConfiguration
   ) {
      super(parent, config);

      this.defaultValue = nsNull(config.defaultValue, false);
   }
}
