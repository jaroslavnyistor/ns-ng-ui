import { nsArrayItemAt } from '../../../../../utils/helpers/arrays/ns-helpers-arrays';
import { LocalizationLanguagesService } from '../../../../../utils/localization/localization-languages.service';
import { OrderDirection } from '../../../../../utils/order/order-direction';
import { NsIcon } from '../../../../icon/ns-icon.enum';
import {
   NsPageListToolbarOrderItem,
   NsPageListToolbarOrderItemDirection,
   NsPageListToolbarOrderOption
} from './ns-page-list-toolbar-order.model';

export class NsPageListToolbarOrderModelCollection {
   private _items: NsPageListToolbarOrderItem[] = [];
   private _activeItem: NsPageListToolbarOrderItemDirection;
   private readonly _ascText: string;
   private readonly _descText: string;

   constructor(langService: LocalizationLanguagesService) {
      this._ascText = langService.getOrderAsc();
      this._descText = langService.getOrderDesc();
   }

   get items(): NsPageListToolbarOrderItem[] {
      return this._items;
   }

   set options(options: NsPageListToolbarOrderOption[]) {
      this._items = options.map((option, idx) => this.parseOption(option, idx));
   }

   private parseOption(option: NsPageListToolbarOrderOption, id: number): NsPageListToolbarOrderItem {
      const item: NsPageListToolbarOrderItem = {
         title: option.title,
         field: option.field,
         directions: []
      };

      item.directions = option.directions
      .map((direction, idx) => this.parseOptionDirection(id, option, item, direction, idx));

      return item;
   }

   private parseOptionDirection(
      baseId: number,
      option: NsPageListToolbarOrderOption,
      item: NsPageListToolbarOrderItem,
      direction: OrderDirection,
      idx: number
   ): NsPageListToolbarOrderItemDirection {
      const isAsc = direction === OrderDirection.Asc;

      const itemDirection = {
         id: (baseId * 2) + idx,
         text: isAsc ? this._ascText : this._descText,
         item,
         direction,
         icon: isAsc ? NsIcon.SortAsc : NsIcon.SortDesc,
         isActive: option.isActive && idx === 0
      } as NsPageListToolbarOrderItemDirection;

      if (itemDirection.isActive) {
         this._activeItem = itemDirection;
      }

      return itemDirection;
   }

   get isVisible() {
      return this._activeItem != null;
   }

   get activeItemId(): number {
      return this._activeItem && this._activeItem.id;
   }

   get activeItemTitle(): string {
      return this._activeItem == null
             ? ''
             : this._activeItem.item.title;
   }

   get activeItemIcon(): NsIcon {
      if (this._activeItem == null) {
         return NsIcon.SortAsc;
      }

      return this._activeItem.icon;
   }

   get activeItemField(): string {
      return this._activeItem && this._activeItem.item.field;
   }

   get activeItemDirection(): OrderDirection {
      return this._activeItem && this._activeItem.direction;
   }

   activate(item: NsPageListToolbarOrderItemDirection) {
      if (this._activeItem != null) {
         this._activeItem.isActive = false;
      }

      this._activeItem = item;

      if (this._activeItem != null) {
         this._activeItem.isActive = true;
      }
   }

   activateById(id: number) {
      if (id != null) {
         this._items.forEach(item => {
            const directions = item.directions.filter(direction => direction.id === id);
            const active = nsArrayItemAt(directions, 0);

            if (active != null) {
               this.activate(active);
            }
         });
      }
   }
}
