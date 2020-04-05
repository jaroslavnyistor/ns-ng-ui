import { NsFormControlConfiguration } from '../ns-form-control.configuration';

export interface NsFormControlNumberConfiguration extends NsFormControlConfiguration {
   minValue?: number;
   maxValue?: number;
   step?: number;
}
