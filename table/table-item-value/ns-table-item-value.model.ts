import { LocalizationLanguagesService } from '../../../utils/localization/localization-languages.service';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsTableColumnModel } from '../ns-table.column.model';
import { NsTableModel } from '../ns-table.model';
import { NsTableItemValueRowEntity } from './ns-table-item-value-row.entity';
import { NsTableItemValueEntity } from './ns-table-item-value.entity';

export class NsTableItemValueModel {
   private readonly _tableModel: NsTableModel<NsTableItemValueRowEntity>;

   get tableModel(): NsTableModel<NsTableItemValueRowEntity> {
      return this._tableModel;
   }

   constructor(langService: LocalizationLanguagesService) {
      const columns = [
         new NsTableColumnModel('item', langService.text(LocalizedTextIdNikisoft.Item))
         .applyWidth('65%'),
         new NsTableColumnModel('value', langService.text(LocalizedTextIdNikisoft.Value))
         .applyWidth('35%')
      ];

      this._tableModel = new NsTableModel<NsTableItemValueRowEntity>(columns);
   }

   setResult(result: NsTableItemValueEntity) {
      this._tableModel.title = result.title;
      this._tableModel.dataSource = result.rows;
      this._tableModel.footerValue = result.footer;
   }

   useFooter(): this {
      this._tableModel.useFooter();

      return this;
   }
}
