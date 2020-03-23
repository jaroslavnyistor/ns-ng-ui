import { Component, Input } from '@angular/core';
import { NsTableItemValueModel } from './ns-table-item-value.model';

@Component({
   selector: 'ns-table-item-value',
   template: `
      <ns-table [model]="model.tableModel">
      </ns-table>
   `,
   styles: []
})
export class NsTableItemValueComponent {
   @Input() model: NsTableItemValueModel;
}
