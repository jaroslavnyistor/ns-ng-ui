import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocalizationLanguagesModule } from '../localization/languages/localization-languages.module';
import { NsIconDefaultAddComponent } from './default/ns-icon-default-add.component';
import { NsIconDefaultDeleteComponent } from './default/ns-icon-default-delete.component';
import { NsIconDefaultEditComponent } from './default/ns-icon-default-edit.component';
import { NsIconDefaultListComponent } from './default/ns-icon-default-list.component';
import { NsIconDefaultPickDateComponent } from './default/ns-icon-default-pick-date.component';
import { NsIconDefaultComponent } from './default/ns-icon-default.component';
import { NsIconLargeComponent } from './large/ns-icon-large.component';
import { NsIconNormalComponent } from './normal/ns-icon-normal.component';
import { NsIconComponent } from './ns-icon.component';
import { NsIconSemiLargeComponent } from './semi-large/ns-icon-semi-large.component';
import { NsIconSmallComponent } from './small/ns-icon-small.component';

@NgModule({
  declarations: [
    NsIconComponent,
    NsIconDefaultComponent,
    NsIconSmallComponent,
    NsIconSemiLargeComponent,
    NsIconLargeComponent,
    NsIconNormalComponent,
    NsIconDefaultAddComponent,
    NsIconDefaultEditComponent,
    NsIconDefaultDeleteComponent,
    NsIconDefaultPickDateComponent,
    NsIconDefaultListComponent,
  ],
  imports: [CommonModule, MatIconModule, MatListModule, MatButtonModule, MatTooltipModule, LocalizationLanguagesModule],
  exports: [
    NsIconDefaultComponent,
    NsIconSmallComponent,
    NsIconSemiLargeComponent,
    NsIconLargeComponent,
    NsIconNormalComponent,
    NsIconDefaultAddComponent,
    NsIconDefaultEditComponent,
    NsIconDefaultDeleteComponent,
    NsIconDefaultPickDateComponent,
    NsIconDefaultListComponent,
  ],
})
export class NsIconModule {}
