import { Component, Input } from '@angular/core';
import { nsIsNotNullOrEmpty } from 'nikisoft-utils';

@Component({
  selector: 'ns-loading-inline',
  templateUrl: './ns-loading-inline.component.html',
  styleUrls: ['./ns-loading-inline.component.sass'],
})
export class NsLoadingInlineComponent {
  private _text: string;
  private _hasText = false;

  @Input() diameter: number;

  @Input() get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
    this._hasText = nsIsNotNullOrEmpty(this._text);
  }

  get hasText(): boolean {
    return this._hasText;
  }
}
