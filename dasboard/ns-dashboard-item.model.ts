import { nsIsNotNullOrEmpty } from '../../utils/helpers/strings/ns-helpers-strings';
import { NsPageListLayoutItemModel } from '../page/list/layout/item/ns-page-list-layout-item.model';
import { NsDashboardItemEntity } from './ns-dashboard-item.entity';

export class NsDashboardItemModel extends NsPageListLayoutItemModel {
   get name(): string {
      return this._entity.name;
   }

   get isClickable(): boolean {
      return nsIsNotNullOrEmpty(this.route);
   }

   get route(): string {
      return this._entity.route;
   }

   constructor(private _entity: NsDashboardItemEntity) {
      super(_entity.id);
   }
}
