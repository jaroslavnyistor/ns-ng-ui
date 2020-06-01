import { LocalizationLanguagesService } from 'nikisoft-utils';
import { NsPageListLayoutItemModel } from '../page/list/layout/item/ns-page-list-layout-item.model';
import { NsDashboardItemEntity } from './ns-dashboard-item.entity';

export class NsDashboardItemModel extends NsPageListLayoutItemModel {
  private readonly _title: string;

  get title(): string {
    return this._title;
  }

  constructor(id: number, private readonly _entity: NsDashboardItemEntity, langService: LocalizationLanguagesService) {
    super(id);

    if (this._entity.title != null) {
      this._title = this._entity.title;
    } else if (this._entity.titleId != null) {
      this._title = langService.translate(this._entity.titleId);
    } else {
      this._title = '';
    }
  }

  handleItemClicked() {
    this._entity.action();
  }
}
