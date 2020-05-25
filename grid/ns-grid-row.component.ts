import { Component, ContentChildren, QueryList } from '@angular/core';
import { NsGridColumnDirective } from './ns-grid-column.directive';

@Component({
  selector: 'ns-grid-row',
  templateUrl: './ns-grid-row.component.html',
  styles: [
  ]
})
export class NsGridRowComponent {
  private _columnWidth: string;
  private _columns: QueryList<NsGridColumnDirective>;

  get columnWidth(): string {
    return this._columnWidth;
  }

  @ContentChildren(NsGridColumnDirective, { descendants: true })
  get columns(): QueryList<NsGridColumnDirective> {
    return this._columns;
  }

  set columns(value: QueryList<NsGridColumnDirective>) {
    this._columns = value;
    this.handleColumnsChange();
  }

  private handleColumnsChange() {
    const count = this._columns.length;
    this._columnWidth = `1 1 ${100 / count}%`;
  }
}
