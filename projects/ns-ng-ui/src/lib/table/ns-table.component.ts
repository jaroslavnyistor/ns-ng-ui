import { Component, Input } from '@angular/core';
import { NsTableModel } from './ns-table.model';

@Component({
   selector: 'ns-table',
   templateUrl: './ns-table.component.html',
   styleUrls: ['./ns-table.component.sass']
})
export class NsTableComponent {
   @Input() model: NsTableModel<any>;
}
