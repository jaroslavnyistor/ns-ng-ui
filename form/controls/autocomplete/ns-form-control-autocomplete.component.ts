import { Component, Input } from '@angular/core';
import { NsIcon } from 'src/app/nikisoft/ui/icon/ns-icon.enum';
import { NsFormControlAutocompleteModel } from './ns-form-control-autocomplete.model';

@Component({
   selector: 'ns-form-control-autocomplete',
   templateUrl: './ns-form-control-autocomplete.component.html',
   styleUrls: ['./ns-form-control-autocomplete.component.sass']
})
export class NsFormControlAutocompleteComponent {
   @Input() model: NsFormControlAutocompleteModel<any, any>;

   NsIcon = NsIcon;
}
