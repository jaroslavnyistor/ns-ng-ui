import { NsFormControlValidator } from '../validators/ns-form-control.validator';
import { NsFormControlDefinition } from './ns-form-control.definition';

export interface NsFormControlConfiguration {
   key: string;
   tabIndex?: number;
   labelId: any;
   hintId?: any;
   isRequired?: boolean;
   isDisabled?: boolean;
   dependsOn?: NsFormControlDefinition[];
   validators?: NsFormControlValidator[];
   defaultValue?: number;
}
