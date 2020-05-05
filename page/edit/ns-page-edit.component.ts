import { Component, Input } from '@angular/core';
import { NsComponentBase } from '../../component/ns-component.base';
import { NsPageEditModel } from './ns-page-edit.model';
import { NsPageEditService } from './ns-page-edit.service';

@Component({
   selector: 'ns-page-edit',
   templateUrl: './ns-page-edit.component.html',
   styleUrls: ['./ns-page-edit.component.sass']
})
export class NsPageEditComponent
   extends NsComponentBase<NsPageEditService<any, any, any, any>, NsPageEditModel<any, any, any>> {

   @Input() pageTitle: string;

   @Input() xl = 30;
   @Input() lg = 35;
   @Input() md = 60;
   @Input() sm = 100;
   @Input() xs = 100;

   constructor(service: NsPageEditService<any, any, any, any>) {
      super(service);
   }
}
