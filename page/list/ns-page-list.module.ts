import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import {
   MatCardModule,
   MatDividerModule,
   MatMenuModule,
   MatPaginatorModule,
   MatTooltipModule
} from '@angular/material';
import { NsIconModule } from '../../icon/ns-icon.module';
import { NsLoadingModule } from '../../loading/ns-loading.module';
import { LocalizationLanguagesModule } from '../../localization/languages/localization-languages.module';
import { NsSearchModule } from '../../search/ns-search.module';
import { NsPageErrorsModule } from '../errors/ns-page-errors.module';
import { NsToolbarModule } from '../toolbar/ns-toolbar.module';
import { NsPageListLayoutCustomItemDirective } from './layout/custom/ns-page-list-layout-custom-item.directive';
import { NsPageListLayoutCustomComponent } from './layout/custom/ns-page-list-layout-custom.component';
import { NsPageListLayoutCustomDirective } from './layout/custom/ns-page-list-layout-custom.directive';
import { NsPageListLayoutDefaultComponent } from './layout/default/ns-page-list-layout-default.component';
import { NsPageListComponent } from './ns-page-list.component';
import { NsPageListToolbarItemDirective } from './toolbar/ns-page-list-toolbar-item.directive';
import { NsPageListToolbarComponent } from './toolbar/ns-page-list-toolbar.component';
import { NsPageListToolbarOrderComponent } from './toolbar/order/ns-page-list-toolbar-order.component';

@NgModule({
   declarations: [
      NsPageListComponent,
      NsPageListLayoutDefaultComponent,
      NsPageListToolbarComponent,
      NsPageListToolbarItemDirective,
      NsPageListToolbarOrderComponent,
      NsPageListLayoutCustomDirective,
      NsPageListLayoutCustomComponent,
      NsPageListLayoutCustomItemDirective,
   ],
   imports: [
      CommonModule,
      FlexModule,
      MatCardModule,
      MatDividerModule,
      NsIconModule,
      MatMenuModule,
      MatTooltipModule,
      LocalizationLanguagesModule,
      NsSearchModule,
      NsLoadingModule,
      NsPageErrorsModule,
      MatPaginatorModule,
      NsToolbarModule
   ],
   exports: [
      NsPageListComponent,
      NsPageListToolbarItemDirective,
      NsPageListToolbarComponent,
      NsPageListLayoutCustomDirective,
      NsPageListLayoutCustomComponent,
      NsPageListLayoutCustomItemDirective,
   ]
})
export class NsPageListModule {
}
