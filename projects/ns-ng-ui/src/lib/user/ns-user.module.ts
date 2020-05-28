import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { NsButtonModule } from '../button/ns-button.module';
import { NsIconModule } from '../icon/ns-icon.module';
import { LocalizationLanguagesModule } from '../localization/languages/localization-languages.module';
import { NsUserLogInInformationComponent } from './log-in/ns-user-log-in-information.component';

@NgModule({
   declarations: [
      NsUserLogInInformationComponent
   ],
   imports: [
      CommonModule,
      NsIconModule,
      MatMenuModule,
      MatDividerModule,
      LocalizationLanguagesModule,
      NsButtonModule
   ],
   exports: [
      NsUserLogInInformationComponent
   ]
})
export class NsUserModule {
}
