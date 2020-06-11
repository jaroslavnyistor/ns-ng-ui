import { Component, Input } from '@angular/core';
import { NsString } from 'nikisoft-utils';

@Component({
  selector: 'ns-card',
  templateUrl: './ns-card.component.html',
  styleUrls: ['./ns-card.component.sass'],
})
export class NsCardComponent {
  private _cardCss: string;
  private _isInAnotherCard = false;
  private _isClickable = false;

  @Input() cardTitle: string;
  @Input() cardSubtitle: string;

  @Input()
  set isInAnotherCard(value: boolean) {
    this._isInAnotherCard = value;
    this.resolveCardCss();
  }

  @Input()
  get isClickable(): boolean {
    return this._isClickable;
  }

  set isClickable(value: boolean) {
    this._isClickable = value;
    this.resolveCardCss();
  }

  get cardCss(): string {
    return this._cardCss;
  }

  get hasCardTitle(): boolean {
    return NsString.isNotNullOrEmpty(this.cardTitle);
  }

  get hasCardSubtitle(): boolean {
    return NsString.isNotNullOrEmpty(this.cardSubtitle);
  }

  constructor() {
    this.isClickable = false;
  }

  private resolveCardCss() {
    this._cardCss = '';

    if (this._isInAnotherCard) {
      this._cardCss = `${this._cardCss} ns-page-list-item`;
    }

    if (this.isClickable) {
      this._cardCss = `${this._cardCss} ns-list-item`;
    }
  }
}
