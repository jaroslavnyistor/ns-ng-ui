import { Component, Input } from '@angular/core';
import { NsComponentBase } from '../../component/ns-component.base';
import { NsIcon } from '../../icon/ns-icon.enum';
import { NsPageDefaultModel } from './ns-page-default.model';
import { NsPageDefaultService } from './ns-page-default.service';

@Component({
  selector: 'ns-page-default',
  templateUrl: './ns-page-default.component.html',
  styleUrls: ['./ns-page-default.component.sass'],
})
export class NsPageDefaultComponent extends NsComponentBase<
  NsPageDefaultService<any, any, any>,
  NsPageDefaultModel<any, any>
> {
  private _scrollPage = false;
  private _scrollPageCss = [];
  private _scrollContent = false;
  private _scrollContentCss = [];

  @Input() pageTitle: string;

  @Input() xl = 80;
  @Input() lg = 85;
  @Input() md = 90;
  @Input() sm = 100;
  @Input() xs = 100;

  get arrowBackIcon(): NsIcon {
    return NsIcon.Navigation_ArrowBack;
  }

  @Input() set scrollPage(value: boolean) {
    this._scrollPage = value;

    this.resolveScrollPageCss();
  }

  get scrollPageCss(): string[] {
    return this._scrollPageCss;
  }

  @Input() set scrollContent(value: boolean) {
    this._scrollContent = value;

    this.resolveScrollContentCss();
  }

  get scrollContentCss(): string[] {
    return this._scrollContentCss;
  }

  constructor(service: NsPageDefaultService<any, any, any>) {
    super(service);

    this.resolveScrollPageCss();
    this.resolveScrollContentCss();
  }

  private resolveScrollPageCss() {
    this._scrollPageCss = ['container'];

    if (this._scrollPage) {
      this._scrollPageCss.push('scroll-page');
    }
  }

  private resolveScrollContentCss() {
    this.resolveScrollPageCss();

    this._scrollContentCss = ['ns-card-content'];

    if (this._scrollContent) {
      this._scrollContentCss.push('scroll-content');
      this._scrollPageCss.push('scroll-content');
    }
  }
}
