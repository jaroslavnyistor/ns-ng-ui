import { NsFormControlConfiguration } from '../ns-form-control.configuration';
import { NsFormControlAutocompleteService } from './ns-form-control-autocomplete.service';

export interface NsFormControlAutocompleteConfiguration extends NsFormControlConfiguration {
   service?: NsFormControlAutocompleteService
}
