import { NsTableItemValueRowEntity } from './ns-table-item-value-row.entity';

export interface NsTableItemValueEntity {
   title: string;
   rows: NsTableItemValueRowEntity[];
   footer?: NsTableItemValueRowEntity;
}
