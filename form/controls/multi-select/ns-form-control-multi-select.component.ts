import { Component, Input } from '@angular/core';
import { NsIcon } from 'src/app/nikisoft/ui/icon/ns-icon.enum';
import { NsFormControlMultiSelectModel } from './ns-form-control-multi-select.model';

@Component({
   selector: 'ns-form-control-autocomplete',
   templateUrl: './ns-form-control-multi-select.component.html',
   styleUrls: ['./ns-form-control-multi-select.component.sass']
})
export class NsFormControlMultiSelectComponent {
   @Input() model: NsFormControlMultiSelectModel<any, any>;

   NsIcon = NsIcon;
}
