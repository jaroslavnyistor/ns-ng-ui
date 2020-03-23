import { Component, Input } from '@angular/core';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { NsFormControlInputModel } from './ns-form-control-input.model';

@Component({
   selector: 'ns-form-control-input',
   templateUrl: './ns-form-control-input.component.html',
   styleUrls: ['./ns-form-control-input.component.sass']
})
export class NsFormControlInputComponent {
   NsIcon = NsIcon;

   @Input() model: NsFormControlInputModel<any>;
}
