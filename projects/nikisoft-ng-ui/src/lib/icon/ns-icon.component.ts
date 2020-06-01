import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { nsIsNullOrEmpty } from 'nikisoft-utils';
import { NsIcon } from './ns-icon.enum';

@Component({
  selector: 'ns-icon',
  templateUrl: 'ns-icon.component.html',
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class NsIconComponent implements OnChanges, AfterViewInit {
  private _css: string[] = [];
  private _hasContent = false;

  @ViewChild('content') content: ElementRef<HTMLElement>;
  @Input() size: string;
  @Input() icon: NsIcon;
  @Input() keepSpace: boolean;
  @Input() disabled: boolean;
  @Input() isClickable: boolean;
  @Input() inverse = false;
  @Input() tooltip: string;
  @Input() isFocusable = true;

  get tabIndex(): number {
    return this.isFocusable ? 0 : -1;
  }

  get disabledTooltip(): boolean {
    return nsIsNullOrEmpty(this.tooltip) || this.disabled;
  }

  get hasContent(): boolean {
    return this._hasContent;
  }

  get buttonStyle(): object {
    if (this._hasContent) {
      return {
        padding: '3px 8px',
      };
    }

    const buttonSize = Number.parseInt(this.size, 10) + 8;
    return {
      'line-height': `${buttonSize}px`,
      width: `${buttonSize}px`,
      height: `${buttonSize}px`,
    };
  }

  get style(): object {
    let style: any = {
      'user-select': 'none',
      'font-size': `${this.size}px`,
      'line-height': `${this.size}px`,
      width: `${this.size}px`,
      height: `${this.size}px`,
      ...this.spaceStyle,
      ...this.disabledStyle,
    };

    if (this._hasContent) {
      style = {
        ...style,
        'margin-right': '10px',
      };
    }

    return style;
  }

  private get spaceStyle(): object {
    if (this.icon == null) {
      if (this.keepSpace) {
        return { visibility: 'hidden' };
      }
      return { display: 'none' };
    }

    return {};
  }

  private get disabledStyle(): object {
    return this.disabled && !this.isClickable ? { opacity: '0.55' } : {};
  }

  get css(): string[] {
    return this._css;
  }

  constructor(private _cdRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isClickable) {
      this.generateCss();
    }
  }

  ngAfterViewInit(): void {
    const hasContent = this.content != null && this.content.nativeElement.childNodes.length > 0;
    if (hasContent !== this._hasContent) {
      this._hasContent = hasContent;
      this._cdRef.detectChanges();
    }
  }

  private generateCss() {
    this._css = [];
  }
}
