import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { LocalizationLanguagesModule } from '../../localization/languages/localization-languages.module';
import { NsPageErrorsComponent } from './ns-page-errors.component';

@NgModule({
   declarations: [
      NsPageErrorsComponent,
   ],
   imports: [
      CommonModule,
      MatExpansionModule,
      LocalizationLanguagesModule
   ],
   exports: [
      NsPageErrorsComponent,
   ]
})
export class NsPageErrorsModule {
}
