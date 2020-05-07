import { Component, Inject, Input, QueryList } from '@angular/core';
import { NsComponentBase } from '../../../component/ns-component.base';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { DI_NS_VERSION } from '../../../ns-tokens.di';
import { NsPageModel } from '../ns-page.model';
import { NsPageService } from '../ns-page.service';
import { NsPageToolbarHeaderItemDirective } from './ns-page-toolbar-header-item.directive';

@Component({
   selector: 'ns-page-toolbar',
   templateUrl: './ns-page-toolbar.component.html',
   styleUrls: ['./ns-page-toolbar.component.sass']
})
export class NsPageToolbarComponent extends NsComponentBase<NsPageService<any, any, any>, NsPageModel<any, any>> {
   readonly menuIcon = NsIcon.Menu;
   @Input() headerItems!: QueryList<NsPageToolbarHeaderItemDirective>;

   constructor(service: NsPageService<any, any, any>, @Inject(DI_NS_VERSION) public version: string) {
      super(service);
   }
}
