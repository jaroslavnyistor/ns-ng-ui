import { NsFormControlConfiguration } from '../ns-form-control.configuration';

export interface NsFormControlInputConfiguration extends NsFormControlConfiguration {
   minLength?: number;
   maxLength?: number;
   minValue?: number;
   maxValue?: number;
   suggestions?: NsFormControlInputSuggestionConfiguration
}

export interface NsFormControlInputSuggestionConfiguration {
   key: string;
   list: any[];
   click: (suggestion: any) => void;
}
