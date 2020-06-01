import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NsPageListToolbarOrderModelCollection } from './ns-page-list-toolbar-order-model.collection';
import { NsPageListToolbarOrderItemDirection } from './ns-page-list-toolbar-order.model';

@Component({
  selector: 'ns-page-list-toolbar-order',
  templateUrl: './ns-page-list-toolbar-order.component.html',
  styleUrls: ['./ns-page-list-toolbar-order.component.sass'],
})
export class NsPageListToolbarOrderComponent {
  private _model: NsPageListToolbarOrderModelCollection;

  @Output() orderChange = new EventEmitter();

  get model(): NsPageListToolbarOrderModelCollection {
    return this._model;
  }

  @Input() set model(value: NsPageListToolbarOrderModelCollection) {
    this._model = value;
  }

  handleOrderItemClick(item: NsPageListToolbarOrderItemDirection) {
    this._model.activate(item);
    this.orderChange.emit();
  }
}
