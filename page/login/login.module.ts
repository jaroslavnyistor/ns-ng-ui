import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NsFormModule } from '../../form/ns-form.module';
import { LocalizationLanguagesModule } from '../../localization/languages/localization-languages.module';
import { NsPageEditModule } from '../edit/ns-page-edit.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
   declarations: [
      LoginComponent
   ],
   imports: [
      CommonModule,
      LoginRoutingModule,
      NsPageEditModule,
      NsFormModule,
      LocalizationLanguagesModule
   ]
})
export class LoginModule {
}
