import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NsComponentBase } from '../../component/ns-component.base';
import { NsPageModel } from './ns-page.model';
import { NsPageService } from './ns-page.service';
import { NsPageToolbarHeaderItemDirective } from './toolbar/ns-page-toolbar-header-item.directive';

@Component({
   selector: 'ns-page',
   templateUrl: './ns-page.component.html',
   styleUrls: ['./ns-page.component.sass']
})
export class NsPageComponent extends NsComponentBase<NsPageService<any, any, any>, NsPageModel<any, any>> {
   @Input() pageTitle: string;

   @ContentChildren(NsPageToolbarHeaderItemDirective, { descendants: true })
   headerItems!: QueryList<NsPageToolbarHeaderItemDirective>;

   constructor(service: NsPageService<any, any, any>) {
      super(service);
   }
}
