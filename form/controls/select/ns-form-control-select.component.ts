import { Component, Input, OnInit } from '@angular/core';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { NsFormControlSelectModel } from './ns-form-control-select.model';

@Component({
   selector: 'ns-form-control-select',
   templateUrl: './ns-form-control-select.component.html',
   styleUrls: ['./ns-form-control-select.component.sass']
})
export class NsFormControlSelectComponent implements OnInit {
   NsIcon = NsIcon;

   @Input() model: NsFormControlSelectModel<any, any>;

   ngOnInit(): void {
      this.model.loadData();
   }
}
