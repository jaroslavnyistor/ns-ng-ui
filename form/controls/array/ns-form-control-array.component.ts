import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { nsIsNotNullOrEmpty } from '../../../../utils/helpers/strings/ns-helpers-strings';
import { NsFormControlArrayItemTemplateDirective } from './ns-form-control-array-item-template.directive';
import { NsFormControlArrayModel } from './ns-form-control-array.model';

@Component({
   selector: 'ns-form-control-array',
   templateUrl: './ns-form-control-array.component.html',
   styleUrls: ['./ns-form-control-array.component.sass']
})
export class NsFormControlArrayComponent {
   @Input() model: NsFormControlArrayModel<any, any, any, any, any, any>;
   @Input() noItemsMessage: string;

   get hasNoItemsMessage(): boolean {
      return nsIsNotNullOrEmpty(this.noItemsMessage);
   }

   @ContentChild(NsFormControlArrayItemTemplateDirective, { read: TemplateRef, static: true })
   itemTemplate: TemplateRef<any>;
}
