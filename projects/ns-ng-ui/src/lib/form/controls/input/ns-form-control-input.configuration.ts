import { NsFormControlConfiguration } from '../ns-form-control.configuration';

export interface NsFormControlInputConfiguration extends NsFormControlConfiguration {
   minLength?: number;
   maxLength?: number;
   autofocus?: boolean;
}
