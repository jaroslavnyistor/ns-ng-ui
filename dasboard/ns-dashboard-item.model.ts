import { LocalizationLanguagesService } from '../../utils/localization/localization-languages.service';
import { NsPageListLayoutItemModel } from '../page/list/layout/item/ns-page-list-layout-item.model';
import { NsDashboardItemEntity } from './ns-dashboard-item.entity';

export class NsDashboardItemModel extends NsPageListLayoutItemModel {
   private readonly _name: string;

   get name(): string {
      return this._name;
   }

   constructor(
      id: number,
      private readonly _entity: NsDashboardItemEntity,
      langService: LocalizationLanguagesService
   ) {
      super(id);

      this._name = langService.translate(_entity.nameId);
   }

   handleItemClicked() {
      this._entity.action();
   }
}
