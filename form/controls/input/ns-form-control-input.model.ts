import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { nsStringLength } from '../../../../utils/helpers/strings/ns-helpers-strings';
import { NsFormControlLengthMaxValidator } from '../../validators/provided/ns-form-control-length-max.validator';
import { NsFormControlLengthMinValidator } from '../../validators/provided/ns-form-control-length-min.validator';
import { NsFormControlValueMaxValidator } from '../../validators/provided/ns-form-control-value-max.validator';
import { NsFormControlValueMinValidator } from '../../validators/provided/ns-form-control-value-min.validator';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlInputType } from './ns-form-control-input-type.enum';
import { NsFormControlInputConfiguration } from './ns-form-control-input.configuration';

export class NsFormControlInputModel<TEntity>
   extends NsFormControlModel<TEntity, FormControl, NsFormControlInputConfiguration> {
   private readonly _type: NsFormControlInputType;
   private _remainingCharacters$: Observable<string>;

   get type(): NsFormControlInputType {
      return this._type;
   }

   get hasMaxLengthSet(): boolean {
      return this._config.maxLength != null;
   }

   get maxLength(): number {
      return this._config.maxLength;
   }

   get minValue(): number {
      return this._config.minValue;
   }

   get maxValue(): number {
      return this._config.maxValue;
   }

   get remainingCharacters$(): Observable<string> {
      return this._remainingCharacters$;
   }

   constructor(type: NsFormControlInputType, config: NsFormControlInputConfiguration) {
      super(new FormControl(), config);

      this._type = type;

      if (config.minLength != null) {
         this.addValidator(new NsFormControlLengthMinValidator(config.minLength));
      }

      if (this.maxLength != null) {
         this.addValidator(new NsFormControlLengthMaxValidator(this.maxLength));
      }

      if (this.minValue != null) {
         this.addValidator(new NsFormControlValueMinValidator(this.minValue));
      }

      if (this.maxValue != null) {
         this.addValidator(new NsFormControlValueMaxValidator(this.maxValue));
      }

      this.defaultValue = nsNull(config.defaultValue, null);
   }

   onInit() {
      super.onInit();

      this.setRemainingCharacters$();
   }

   private setRemainingCharacters$() {
      this._remainingCharacters$ = this.valueChanges$
         .pipe(
            map(newValue => {
               if (this.maxLength == null) {
                  return ''
               }

               const valueLength = nsStringLength(newValue);
               return `${valueLength}/${this.maxLength}`;
            })
         );
   }
}
