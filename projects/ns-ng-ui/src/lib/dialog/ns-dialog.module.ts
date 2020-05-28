import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LocalizationLanguagesModule } from '../localization/languages/localization-languages.module';
import { NsDialogDeleteComponent } from './delete/ns-dialog-delete.component';

@NgModule({
   declarations: [NsDialogDeleteComponent],
   imports: [
      CommonModule,
      MatDialogModule,
      MatButtonModule,
      LocalizationLanguagesModule,
   ],
   exports: [
      MatDialogModule
   ],
   entryComponents: [NsDialogDeleteComponent]
})
export class NsDialogModule {
}
