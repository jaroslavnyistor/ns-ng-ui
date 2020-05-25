import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { nsStringLength } from '../../../../utils/helpers/strings/ns-helpers-strings';
import { NsFormControlLengthMaxValidator } from '../../validators/provided/ns-form-control-length-max.validator';
import { NsFormControlLengthMinValidator } from '../../validators/provided/ns-form-control-length-min.validator';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlInputType } from './ns-form-control-input-type.enum';
import { NsFormControlInputConfiguration } from './ns-form-control-input.configuration';

export class NsFormControlInputModel<TEntity>
   extends NsFormControlModel<TEntity, NsFormControl, NsFormControlInputConfiguration> {
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

   get remainingCharacters$(): Observable<string> {
      return this._remainingCharacters$;
   }

   constructor(type: NsFormControlInputType, config: NsFormControlInputConfiguration) {
      super(config);

      this._type = type;

      if (config.minLength != null) {
         this.addValidator(new NsFormControlLengthMinValidator(config.minLength));
      }

      if (this.maxLength != null) {
         this.addValidator(new NsFormControlLengthMaxValidator(this.maxLength));
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
