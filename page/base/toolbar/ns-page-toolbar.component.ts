import { Component, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { NsIcon } from '../../../icon/ns-icon.enum';
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

   handleMenuOpened() {
      this.isMenuOpened = !this.isMenuOpened;
      this.isMenuOpenedChange.emit(this.isMenuOpened);
   }
}
