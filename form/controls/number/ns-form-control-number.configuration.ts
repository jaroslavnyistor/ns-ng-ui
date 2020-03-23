import { NsFormControlConfiguration } from '../ns-form-control.configuration';

// @ts-ignore
export interface NsFormControlNumberConfiguration extends NsFormControlConfiguration {
   isReadonly?: boolean;
   minValue?: number;
   maxValue?: number;
   step?: number;
}
