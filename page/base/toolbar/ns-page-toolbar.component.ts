import { Component, EventEmitter, Inject, InjectionToken, Input, Output, QueryList } from '@angular/core';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { DI_NS_VERSION } from '../../../ns-tokens.di';
import { NsPageToolbarHeaderItemDirective } from './ns-page-toolbar-header-item.directive';

@Component({
   selector: 'ns-page-toolbar',
   templateUrl: './ns-page-toolbar.component.html',
   styleUrls: ['./ns-page-toolbar.component.sass']
})
export class NsPageToolbarComponent {
   @Input() isNavigationVisible: boolean;

   get menuIcon(): NsIcon {
      return NsIcon.Menu;
   }

   @Input() toolbarTitle: string;
   @Input() isMenuOpened: boolean;
   @Input() headerItems!: QueryList<NsPageToolbarHeaderItemDirective>;

   @Output() isMenuOpenedChange: EventEmitter<boolean> = new EventEmitter();

   constructor(@Inject(DI_NS_VERSION) public version: string) {
   }

   handleMenuOpened() {
      this.isMenuOpened = !this.isMenuOpened;
      this.isMenuOpenedChange.emit(this.isMenuOpened);
   }
}
