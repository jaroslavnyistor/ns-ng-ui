import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NsSubscriptionService } from '../../../utils/subscription/ns-subscription.service';
import { NsDialogDeleteComponent } from './ns-dialog-delete.component';
import { NsDialogDeleteModel } from './ns-dialog-delete.model';

@Injectable({
   providedIn: 'root'
})
export class NsDialogDeleteService extends NsSubscriptionService {
   private readonly _dialog: MatDialog;

   constructor(dialog: MatDialog) {
      super();

      this._dialog = dialog;
   }

   open(title: string, message: string, confirmCallback: () => void) {
      const data: NsDialogDeleteModel = {
         title,
         message
      };

      const config = {
         data
      };

      this.subscribeTo(
         this._dialog.open(NsDialogDeleteComponent, config).afterClosed(),
         {
            next: confirmed => {
               if (confirmed) {
                  confirmCallback();
               }
            }
         }
      );
   }
}
