import { LocalizationLanguagesService } from '../../../../../../utils/localization/localization-languages.service';
import { NsToolbarNavigationItemGroupEntity } from './ns-toolbar-navigation-item-group.entity';
import { NsToolbarNavigationItemEntity } from './ns-toolbar-navigation-item.entity';
import { NsToolbarNavigationItemModel } from './ns-toolbar-navigation-item.model';

export class NsToolbarNavigationItemGroupModel {
   private readonly _title: string;
   private readonly _hasTitle: boolean;
   private readonly _hasItems: boolean;
   private readonly _items: NsToolbarNavigationItemModel[];

   get title(): string {
      return this._title;
   }

   get hasTitle(): boolean {
      return this._hasTitle;
   }

   get hasItems(): boolean {
      return this._hasItems;
   }

   get items(): NsToolbarNavigationItemModel[] {
      return this._items;
   }

   constructor(
      entity: NsToolbarNavigationItemGroupEntity,
      isLoggedIn: boolean,
      langService: LocalizationLanguagesService
   ) {
      this._hasTitle = entity.titleId != null;

      this._title = this._hasTitle
                    ? langService.translate(entity.titleId)
                    : '';

      this._hasItems = entity.items.length > 0;
      this._items = entity.items
         .filter(entity => NsToolbarNavigationItemGroupModel.filterEntity(entity, isLoggedIn))
         .map(item => new NsToolbarNavigationItemModel(item, langService));
   }


   private static filterEntity(entity: NsToolbarNavigationItemEntity, isLoggedIn: boolean): boolean {
      if (entity.requiresAuth === true) {
         return isLoggedIn;
      }

      if (entity.includeIf != null) {
         return entity.includeIf();
      }

      return true;
   }
}
