import { NsFormControlConfiguration } from '../ns-form-control.configuration';
import { NsFormControlArrayService } from './ns-form-control-array.service';

export interface NsFormControlArrayConfiguration extends NsFormControlConfiguration {
   canDeleteItems?: boolean;
   service?: NsFormControlArrayService<any, any, any>;
}
