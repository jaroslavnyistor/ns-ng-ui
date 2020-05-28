import { LocalizationLanguagesService } from 'ns-js-utils';
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
    langService: LocalizationLanguagesService,
  ) {
    this._hasTitle = entity.title != null || entity.titleId != null;

    if (entity.title != null) {
      this._title = entity.title;
    } else if (entity.titleId != null) {
      this._title = langService.translate(entity.titleId);
    }

    this._hasItems = entity.items.length > 0;

    this._items = entity.items
      .filter((item) => NsToolbarNavigationItemGroupModel.filterEntity(item, isLoggedIn))
      .map((item) => new NsToolbarNavigationItemModel(item, langService));
  }

  private static filterEntity(entity: NsToolbarNavigationItemEntity, isLoggedIn: boolean): boolean {
    let result = true;

    if (entity.requiresAuth === true) {
      result = isLoggedIn;
    }

    if (entity.includeIf != null) {
      result = entity.includeIf();
    }

    return result;
  }
}
