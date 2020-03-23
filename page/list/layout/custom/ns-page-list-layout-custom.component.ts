import { Component, ContentChild, Input } from '@angular/core';
import { NsPageListModel } from '../../ns-page-list.model';
import { NsPageListLayoutCustomItemDirective } from './ns-page-list-layout-custom-item.directive';

@Component({
   selector: 'ns-page-list-layout-custom',
   templateUrl: './ns-page-list-layout-custom.component.html',
   styleUrls: ['./ns-page-list-layout-custom.component.sass']
})
export class NsPageListLayoutCustomComponent {
   @Input() xl = 50;
   @Input() lg = 50;
   @Input() md = 50;
   @Input() sm = 50;
   @Input() xs = 100;

   @Input() model: NsPageListModel<any, any, any>;

   @ContentChild(
      NsPageListLayoutCustomItemDirective, { static: true }) itemTemplate: NsPageListLayoutCustomItemDirective;
}
