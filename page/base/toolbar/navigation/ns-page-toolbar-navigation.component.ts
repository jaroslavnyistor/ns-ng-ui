import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DI_NS_APP_LOGO } from '../../../../ns-tokens.di';
import { NsToolbarNavigationItemGroupModel } from './items/ns-toolbar-navigation-item-group.model';
import { NsToolbarNavigationItemModel } from './items/ns-toolbar-navigation-item.model';

@Component({
   selector: 'ns-page-toolbar-navigation',
   templateUrl: './ns-page-toolbar-navigation.component.html',
   styleUrls: ['./ns-page-toolbar-navigation.component.sass']
})
export class NsPageToolbarNavigationComponent {
   @Input() isMenuOpened: boolean;
   @Input() navigationItems$: Observable<NsToolbarNavigationItemGroupModel[]>;
   @Output() isMenuOpenedChange: EventEmitter<boolean> = new EventEmitter();

   get logo(): string {
      return this._logo;
   }

   constructor(@Inject(DI_NS_APP_LOGO) private _logo: string) {
   }

   handleMenuOpened() {
      if (this.isMenuOpened === false) {
         this.updateAndEmitMenuOpenedState();
      }
   }

   handleMenuClosed() {
      if (this.isMenuOpened === true) {
         this.updateAndEmitMenuOpenedState();
      }
   }

   private updateAndEmitMenuOpenedState() {
      this.isMenuOpened = !this.isMenuOpened;
      this.isMenuOpenedChange.emit(this.isMenuOpened);
   }

   handleItemClicked(item: NsToolbarNavigationItemModel) {
      this.updateAndEmitMenuOpenedState();
      item.action();
   }
}
