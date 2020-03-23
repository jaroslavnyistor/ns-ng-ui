import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { nsIsNotNullOrEmpty } from '../../../utils/helpers/strings/ns-helpers-strings';
import { NsSubscriptionBase } from '../../../utils/subscription/ns-subscription.base';
import { NsDialogDeleteModel } from './ns-dialog-delete.model';

@Component({
   selector: 'ns-dialog-delete',
   templateUrl: './ns-dialog-delete.component.html',
   styleUrls: ['./ns-dialog-delete.component.sass']
})
export class NsDialogDeleteComponent extends NsSubscriptionBase {
   constructor(
      public dialogRef: MatDialogRef<NsDialogDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) private _model: NsDialogDeleteModel
   ) {
      super();
   }

   get model(): NsDialogDeleteModel {
      return this._model;
   }

   get hasMessage(): boolean {
      return nsIsNotNullOrEmpty(this.model.message);
   }
}
