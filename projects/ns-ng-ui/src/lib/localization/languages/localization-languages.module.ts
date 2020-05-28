import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
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
