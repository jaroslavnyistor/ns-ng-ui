import { Component, Input } from '@angular/core';
import { NsString } from 'nikisoft-utils';

@Component({
  selector: 'ns-expansion-panel',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header *ngIf="hasHeader">{{ header }}</mat-expansion-panel-header>
      <ng-content></ng-content>
    </mat-expansion-panel>
  `,
  styles: [],
})
export class NsExpansionPanelComponent {
  private _header: string;
  private _hasHeader: boolean;

  @Input()
  get header(): string {
    return this._header;
  }

  set header(value: string) {
    this._header = value;
    this._hasHeader = NsString.isNotNullOrEmpty(this._header);
  }

  @Input()
  get hasHeader(): boolean {
    return this._hasHeader;
  }
}
