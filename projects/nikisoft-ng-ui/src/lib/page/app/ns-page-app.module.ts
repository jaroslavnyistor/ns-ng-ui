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
import { NsPageAppComponent } from './ns-page-app.component';
import { NsPageAppToolbarNavItemsComponent } from './toolbar/nav/items/ns-page-app-toolbar-nav-items.component';
import { NsPageAppToolbarNavComponent } from './toolbar/nav/ns-page-app-toolbar-nav.component';
import { NsPageAppToolbarHeaderItemDirective } from './toolbar/ns-page-app-toolbar-header-item.directive';
import { NsPageAppToolbarComponent } from './toolbar/ns-page-app-toolbar.component';

@NgModule({
  declarations: [
    NsPageAppComponent,
    NsPageAppToolbarComponent,
    NsPageAppToolbarNavComponent,
    NsPageAppToolbarNavItemsComponent,
    NsPageAppToolbarHeaderItemDirective,
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
  exports: [NsPageAppComponent, NsPageAppToolbarHeaderItemDirective],
})
export class NsPageAppModule {}
