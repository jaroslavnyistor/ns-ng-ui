import { Component, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
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

   @ViewChild('trigger', { static: false }) menu: MatMenuTrigger;

   handleMenuOpened() {
      if (this.model.suggestions != null && this.model.suggestions.list.length > 0) {
         this.menu.openMenu();
      }
   }
}
