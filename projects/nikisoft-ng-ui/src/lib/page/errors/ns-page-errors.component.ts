import { Component, Input } from '@angular/core';
import { NsArray } from 'nikisoft-utils';

@Component({
  selector: 'ns-page-errors',
  template: `
    <p *ngIf="hasOnlyOneError; else errorsTemplate">
      {{ firstError }}
    </p>

    <ng-template #errorsTemplate>
      <mat-expansion-panel *ngIf="hasErrors">
        <mat-expansion-panel-header>{{ 'ErrorsList' | translate }}</mat-expansion-panel-header>
        <ul>
          <li *ngFor="let error of errors">{{ error }}</li>
        </ul>
      </mat-expansion-panel>
    </ng-template>
  `,
  styles: [
    `
      p {
        padding: 15px;
      }

      mat-expansion-panel,
      p {
        margin: 0 0 10px 0;
        color: #d8000c;
        background-color: #ffbaba;
        border-radius: 5px;
        font-size: 14px;
      }

      mat-expansion-panel ul {
        margin: 0;
      }

      mat-expansion-panel ::ng-deep.mat-expansion-indicator::after {
        color: inherit;
      }
    `,
  ],
})
export class NsPageErrorsComponent {
  private _errors: string[];
  private _firstError: string;
  private _hasErrors: boolean;
  private _hasOnlyOneError: boolean;

  @Input()
  get errors(): string[] {
    return this._errors;
  }

  set errors(value: string[]) {
    this._errors = value;
    this._hasErrors = NsArray.hasItems(this._errors);
    this._hasOnlyOneError = this._hasErrors && this._errors.length === 1;
    this._firstError = NsArray.itemAt(this._errors, 0) || '';
  }

  get hasErrors(): boolean {
    return this._hasErrors;
  }

  get hasOnlyOneError(): boolean {
    return this._hasOnlyOneError;
  }

  get firstError(): string {
    return this._firstError;
  }

  constructor() {
    this.errors = [];
  }
}
