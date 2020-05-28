import { Component, Inject } from '@angular/core';
import { nsIsNotNullOrEmpty } from 'ns-js-utils';
import { DI_NS_APP_LOGO } from '../../ns-di.tokens';

@Component({
  selector: 'ns-page-not-found',
  templateUrl: './ns-page-not-found.component.html',
  styleUrls: ['./ns-page-not-found.component.sass'],
})
export class NsPageNotFoundComponent {
  private readonly _hasLogo: boolean;
  private readonly _flex: number;
  private readonly _flexLtSm: number;

  get hasLogo(): boolean {
    return this._hasLogo;
  }

  get logo(): string {
    return this._logo;
  }

  get flex(): number {
    return this._flex;
  }

  get flexLtSm(): number {
    return this._flexLtSm;
  }

  constructor(@Inject(DI_NS_APP_LOGO) private _logo: string) {
    this._hasLogo = nsIsNotNullOrEmpty(_logo);

    this._flex = this._hasLogo ? 50 : 100;
    this._flexLtSm = this._hasLogo ? 70 : 100;
  }
}
