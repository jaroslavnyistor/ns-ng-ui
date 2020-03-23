import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { NsRouterService } from '../../../utils/navigation/ns-router.service';
import { NsToolbarNavigationItemGroupModel } from './toolbar/navigation/items/ns-toolbar-navigation-item-group.model';
import { NsPageToolbarHeaderItemDirective } from './toolbar/ns-page-toolbar-header-item.directive';

@Component({
   selector: 'ns-page',
   templateUrl: './ns-page.component.html',
   styleUrls: ['./ns-page.component.sass']
})
export class NsPageComponent {
   isMenuOpened = false;

   @Input() pageTitle: string;

   @ContentChildren(NsPageToolbarHeaderItemDirective, { descendants: true })
   headerItems!: QueryList<NsPageToolbarHeaderItemDirective>;

   @Input() isNavigationVisible: boolean;
   @Input() navigationItems$: Observable<NsToolbarNavigationItemGroupModel[]>;

   get isNavigating$(): Observable<boolean> {
      return this._routerService.isNavigating$;
   }

   constructor(private _routerService: NsRouterService) {
   }
}
