import { NsFormControlConfiguration } from '../ns-form-control.configuration';

export interface NsFormControlDateTimePickerConfiguration extends NsFormControlConfiguration {
   isReadonly?: boolean;
   canChooseDate?: boolean;
   canChooseTime?: boolean;
}
