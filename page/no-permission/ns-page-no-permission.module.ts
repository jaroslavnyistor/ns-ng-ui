import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { LocalizationLanguagesModule } from '../../localization/languages/localization-languages.module';
import { NsPageNoPermissionRoutingModule } from './ns-page-no-permission-routing.module';
import { NsPageNoPermissionComponent } from './ns-page-no-permission.component';

@NgModule({
   declarations: [
      NsPageNoPermissionComponent
   ],
   imports: [
      CommonModule,
      FlexModule,
      LocalizationLanguagesModule,
      NsPageNoPermissionRoutingModule,
      MatCardModule
   ],
   exports: [
      NsPageNoPermissionComponent
   ]
})
export class NsPageNoPermissionModule {
}
