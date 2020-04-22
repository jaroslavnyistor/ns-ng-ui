import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { nsStringLength } from '../../../../utils/helpers/strings/ns-helpers-strings';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControlLengthMaxValidator } from '../../validators/provided/ns-form-control-length-max.validator';
import { NsFormControlLengthMinValidator } from '../../validators/provided/ns-form-control-length-min.validator';
import { NsFormControlValueMaxValidator } from '../../validators/provided/ns-form-control-value-max.validator';
import { NsFormControlValueMinValidator } from '../../validators/provided/ns-form-control-value-min.validator';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlInputType } from './ns-form-control-input-type.enum';
import { NsFormControlInputConfiguration } from './ns-form-control-input.configuration';

export class NsFormControlInputModel<TEntity>
   extends NsFormControlModel<TEntity, NsFormControlInputModel<TEntity>, NsFormControl> {
   private readonly _type: NsFormControlInputType;
   private readonly _maxLength: number;
   private readonly _minValue: number;
   private readonly _maxValue: number;
   private _remainingCharactersFormatted: string;

   get type(): NsFormControlInputType {
      return this._type;
   }

   get hasMaxLengthSet(): boolean {
      return this._maxLength != null;
   }

   get maxLength(): number {
      return this._maxLength;
   }

   get remainingCharactersFormatted(): string {
      return this._remainingCharactersFormatted;
   }

   get minValue(): number {
      return this._minValue;
   }

   get maxValue(): number {
      return this._maxValue;
   }

   constructor(parent: NsFormModel<TEntity, any>,
               type: NsFormControlInputType,
               config: NsFormControlInputConfiguration
   ) {
      super(parent, config);

      this._type = type;

      if (config.minLength != null) {
         this.addValidator(new NsFormControlLengthMinValidator(config.minLength));
      }

      this._maxLength = config.maxLength;
      if (this._maxLength != null) {
         this.addValidator(new NsFormControlLengthMaxValidator(this._maxLength));
      }

      this._minValue = config.minValue;
      if (this._minValue != null) {
         this.addValidator(new NsFormControlValueMinValidator(this._minValue));
      }

      this._maxValue = config.maxValue;
      if (this._maxValue != null) {
         this.addValidator(new NsFormControlValueMaxValidator(this._maxValue));
      }

      this.defaultValue = nsNull(config.defaultValue, null);

      this.calculateRemainingCharactersCount(this.value);
   }

   protected handleValueChanged(newValue: any) {
      super.handleValueChanged(newValue);

      this.calculateRemainingCharactersCount(newValue);
   }

   private calculateRemainingCharactersCount(newValue: any) {
      if (this._maxLength == null) {
         return;
      }

      const valueLength = nsStringLength(newValue);
      this._remainingCharactersFormatted = `${valueLength}/${this._maxLength}`;
   }
}
