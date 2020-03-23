import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { LocalizationLanguagesMenuComponent } from './menu/localization-languages-menu.component';
import { LocalizationLanguagesPickerComponent } from './picker/localization-languages-picker.component';
import { TranslatePipe } from './translation/translate.pipe';

@NgModule({
   declarations: [
      TranslatePipe,
      LocalizationLanguagesPickerComponent,
      LocalizationLanguagesMenuComponent,
   ],
   imports: [
      CommonModule,
      MatSelectModule,
      MatMenuModule,
      MatIconModule,
      FlexModule,
   ],
   exports: [
      TranslatePipe,
      LocalizationLanguagesPickerComponent,
      LocalizationLanguagesMenuComponent,
   ]
})
export class LocalizationLanguagesModule {
}
