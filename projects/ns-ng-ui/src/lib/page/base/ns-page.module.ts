import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NsButtonModule } from '../../button/ns-button.module';
import { NsDialogModule } from '../../dialog/ns-dialog.module';
import { NsFormModule } from '../../form/ns-form.module';
import { NsIconModule } from '../../icon/ns-icon.module';
import { NsLoadingModule } from '../../loading/ns-loading.module';
import { LocalizationLanguagesModule } from '../../localization/languages/localization-languages.module';
import { NsSearchModule } from '../../search/ns-search.module';
import { NsPageComponent } from './ns-page.component';
import { NsPageToolbarNavigationItemsComponent } from './toolbar/navigation/items/ns-page-toolbar-navigation-items.component';
import { NsPageToolbarNavigationComponent } from './toolbar/navigation/ns-page-toolbar-navigation.component';
import { NsPageToolbarHeaderItemDirective } from './toolbar/ns-page-toolbar-header-item.directive';
import { NsPageToolbarComponent } from './toolbar/ns-page-toolbar.component';

@NgModule({
  declarations: [
    NsPageComponent,
    NsPageToolbarComponent,
    NsPageToolbarNavigationComponent,
    NsPageToolbarNavigationItemsComponent,
    NsPageToolbarHeaderItemDirective,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    NsIconModule,
    NsLoadingModule,
    NsButtonModule,
    LocalizationLanguagesModule,
    FlexLayoutModule,
    NsSearchModule,
    MatPaginatorModule,
    MatMenuModule,
    NsDialogModule,
    MatTooltipModule,
    NsFormModule,
  ],
  exports: [NsPageComponent, NsPageToolbarHeaderItemDirective],
})
export class NsPageModule {}
