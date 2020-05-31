import { LocalizationLanguagesService } from 'ns-js-utils';
import { NsPageAppToolbarNavItemGroupEntity } from './ns-page-app-toolbar-nav-item-group.entity';
import { NsPageAppToolbarNavItemEntity } from './ns-page-app-toolbar-nav-item.entity';
import { NsPageAppToolbarNavItemModel } from './ns-page-app-toolbar-nav-item.model';

export class NsPageAppToolbarNavItemGroupModel {
  private readonly _title: string;
  private readonly _hasTitle: boolean;
  private readonly _hasItems: boolean;
  private readonly _items: NsPageAppToolbarNavItemModel[];

  get title(): string {
    return this._title;
  }

  get hasTitle(): boolean {
    return this._hasTitle;
  }

  get hasItems(): boolean {
    return this._hasItems;
  }

  get items(): NsPageAppToolbarNavItemModel[] {
    return this._items;
  }

  constructor(
    entity: NsPageAppToolbarNavItemGroupEntity,
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
      .filter((item) => NsPageAppToolbarNavItemGroupModel.filterEntity(item, isLoggedIn))
      .map((item) => new NsPageAppToolbarNavItemModel(item, langService));
  }

  private static filterEntity(entity: NsPageAppToolbarNavItemEntity, isLoggedIn: boolean): boolean {
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
