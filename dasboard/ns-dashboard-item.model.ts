import { nsIsNotNullOrEmpty } from '../../utils/helpers/strings/ns-helpers-strings';
import { LocalizationLanguagesService } from '../../utils/localization/localization-languages.service';
import { NsPageListLayoutItemModel } from '../page/list/layout/item/ns-page-list-layout-item.model';
import { NsDashboardItemEntity } from './ns-dashboard-item.entity';

export class NsDashboardItemModel extends NsPageListLayoutItemModel {
   private readonly _name: string;

   get name(): string {
      return this._name;
   }

   get isClickable(): boolean {
      return nsIsNotNullOrEmpty(this.route);
   }

   get route(): string {
      return this._entity.route;
   }

   constructor(
      id: number,
      private readonly _entity: NsDashboardItemEntity,
      langService: LocalizationLanguagesService
   ) {
      super(id);

      this._name = langService.translate(_entity.nameId);
   }
}
