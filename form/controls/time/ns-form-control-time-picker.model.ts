import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlTimePickerConfiguration } from './ns-form-control-time-picker.configuration';

export class NsFormControlTimePickerModel<TEntity>
   extends NsFormControlModel<TEntity, NsFormControlTimePickerModel<TEntity>, NsFormControl> {

   private readonly _isReadonly: boolean;

   get isReadonly(): boolean {
      return this._isReadonly;
   }

   get canChooseTime(): boolean {
      return !this.isDisabled && !this.isReadonly;
   }

   constructor(parent: NsFormModel<TEntity, any>,
               config: NsFormControlTimePickerConfiguration
   ) {
      super(parent, config);

      this._isReadonly = config.isReadonly;

      this.defaultValue = nsNull(config.defaultValue, null);
   }

   canClearValue(): boolean {
      return super.canClearValue()
             && !this._isReadonly;
   }
}
