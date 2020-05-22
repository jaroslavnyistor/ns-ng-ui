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

      if (this._entity.name != null) {
         this._name = this._entity.name;
      }
      else if (this._entity.nameId != null) {
         this._name = langService.translate(this._entity.nameId);
      }
      else {
         this._name = '';
      }
   }

   handleItemClicked() {
      this._entity.action();
   }
}
