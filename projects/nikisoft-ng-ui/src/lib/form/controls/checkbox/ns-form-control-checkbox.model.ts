import { nsNull } from 'nikisoft-utils';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlCheckboxConfiguration } from './ns-form-control-checkbox.configuration';

export class NsFormControlCheckboxModel<TEntity> extends NsFormControlModel<
  TEntity,
  NsFormControl,
  NsFormControlCheckboxConfiguration
> {
  constructor(config: NsFormControlCheckboxConfiguration) {
    super(config);

    this.defaultValue = nsNull(config.defaultValue, false);
  }
}
