import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NsIconModule } from '../../icon/ns-icon.module';
import { LocalizationLanguagesModule } from '../../localization/languages/localization-languages.module';
import { NsToolbarEditComponent } from './edit/ns-toolbar-edit.component';


@NgModule({
   declarations: [NsToolbarEditComponent],
   exports: [
      NsToolbarEditComponent
   ],
   imports: [
      CommonModule,
      NsIconModule,
      MatTooltipModule,
      LocalizationLanguagesModule
   ]
})
export class NsToolbarModule {
}
