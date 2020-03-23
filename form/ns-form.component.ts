import { Component } from '@angular/core';
import { NsComponentBase } from '../component/ns-component.base';
import { NsFormModel } from './ns-form.model';
import { NsFormService } from './ns-form.service';

@Component({
   selector: 'ns-form',
   templateUrl: './ns-form.component.html',
   styleUrls: ['./ns-form.component.sass']
})
export class NsFormComponent extends NsComponentBase<NsFormService<any, any, any>, NsFormModel<any, any>> {
   constructor(service: NsFormService<any, any, any>) {
      super(service);
   }
}
