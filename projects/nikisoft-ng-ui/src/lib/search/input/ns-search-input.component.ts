import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { nsIsNotNullOrEmpty, nsIsNullOrEmpty } from 'nikisoft-utils';
import { NsIcon } from '../../icon/ns-icon.enum';

@Component({
  selector: 'ns-search-input',
  templateUrl: './ns-search-input.component.html',
  styleUrls: ['./ns-search-input.component.sass'],
})
export class NsSearchInputComponent implements AfterViewInit, OnDestroy {
  private _timerId = null;
  private _searchValue = '';

  get icon(): NsIcon {
    return NsIcon.Action_Search;
  }

  @Input() get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this._searchValue = value;
  }

  @Input() tooltip: string;

  get isTooltipDisabled(): boolean {
    return nsIsNullOrEmpty(this.tooltip);
  }

  @ViewChild('input', { static: true }) input: ElementRef;

  @Output() searchValueChange = new EventEmitter<string>();

  ngAfterViewInit(): void {
    if (nsIsNotNullOrEmpty(this.searchValue)) {
      window.setTimeout(() => this.input.nativeElement.click(), 0);
    }
  }

  ngOnDestroy(): void {
    this.clearWaitTimer();
  }

  handleInputChange($event: KeyboardEvent) {
    const inputElement = $event.target as HTMLInputElement;
    const value = inputElement.value;

    this.clearWaitTimer();

    if ($event.key === 'Enter') {
      this.notify(value);
    } else {
      this._timerId = window.setTimeout(() => this.notify(value), 400);
    }
  }

  private clearWaitTimer() {
    if (this._timerId != null) {
      clearTimeout(this._timerId);
      this._timerId = null;
    }
  }

  private notify(value: string) {
    this.searchValueChange.emit(value);
  }

  handleIconClick(value: string) {
    this.notify(value);
  }
}
