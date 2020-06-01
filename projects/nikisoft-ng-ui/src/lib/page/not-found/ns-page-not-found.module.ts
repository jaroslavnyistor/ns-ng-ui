import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { LocalizationLanguagesModule } from '../../localization/languages/localization-languages.module';
import { NsPageNotFoundRoutingModule } from './ns-page-not-found-routing.module';
import { NsPageNotFoundComponent } from './ns-page-not-found.component';

@NgModule({
  declarations: [NsPageNotFoundComponent],
  imports: [CommonModule, FlexModule, LocalizationLanguagesModule, NsPageNotFoundRoutingModule, MatCardModule],
  exports: [NsPageNotFoundComponent],
})
export class NsPageNotFoundModule {}
