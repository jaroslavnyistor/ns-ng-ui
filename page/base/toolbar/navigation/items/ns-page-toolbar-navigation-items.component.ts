import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { nsIsNotNullOrEmpty } from '../../../../../../utils/helpers/strings/ns-helpers-strings';
import { NsToolbarNavigationItemGroupModel } from './ns-toolbar-navigation-item-group.model';
import { NsToolbarNavigationItemModel } from './ns-toolbar-navigation-item.model';

@Component({
   selector: 'ns-page-toolbar-navigation-items',
   templateUrl: './ns-page-toolbar-navigation-items.component.html',
   styleUrls: ['./ns-page-toolbar-navigation-items.component.sass']
})
export class NsPageToolbarNavigationItemsComponent {
   @Input() items$: Observable<NsToolbarNavigationItemGroupModel[]>;

   @Output() itemClick: EventEmitter<NsToolbarNavigationItemModel> = new EventEmitter();

   handleItemClicked(item: NsToolbarNavigationItemModel) {
      this.itemClick.emit(item);
   }

   hasTitle(title: string) {
      return nsIsNotNullOrEmpty(title);
   }
}
