import { NsFormControlConfiguration } from '../ns-form-control.configuration';
import { NsFormControlAutocompleteService } from './ns-form-control-autocomplete.service';

export interface NsFormControlAutocompleteConfiguration<TService extends NsFormControlAutocompleteService>
   extends NsFormControlConfiguration {
   service: TService;
   autofocus?: boolean;
}
