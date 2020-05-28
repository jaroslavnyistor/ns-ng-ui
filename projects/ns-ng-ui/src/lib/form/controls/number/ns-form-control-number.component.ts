import { Component, Input } from '@angular/core';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { NsFormControlNumberModel } from './ns-form-control-number.model';

@Component({
   selector: 'ns-form-control-number',
   templateUrl: './ns-form-control-number.component.html',
   styleUrls: ['./ns-form-control-number.component.sass']
})
export class NsFormControlNumberComponent {
   NsIcon = NsIcon;

   @Input() model: NsFormControlNumberModel<any>;
}
