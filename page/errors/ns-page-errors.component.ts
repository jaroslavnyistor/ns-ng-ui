import { Component, Input } from '@angular/core';

@Component({
   selector: 'ns-page-errors',
   template: `
      <mat-expansion-panel *ngIf="hasErrors">
         <mat-expansion-panel-header>{{'ErrorsList' | translate }}</mat-expansion-panel-header>
         <ul>
            <li *ngFor="let error of errors">{{error}}</li>
         </ul>
      </mat-expansion-panel>
   `,
   styles: [
      `mat-expansion-panel {
         margin: 0 0 10px 0;
         color: #D8000C;
         background-color: #FFBABA;
         border-radius: 5px;
         font-size: 14px
      }

      mat-expansion-panel ul {
         margin: 0;
      }

      mat-expansion-panel ::ng-deep.mat-expansion-indicator::after {
         color: inherit;
      }
      `
   ]
})
export class NsPageErrorsComponent {
   @Input() errors: string[] = [];

   get hasErrors(): boolean {
      return this.errors != null && this.errors.length > 0;
   }
}
