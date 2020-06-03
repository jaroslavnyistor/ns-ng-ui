import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { NsButtonModule } from '../../button/ns-button.module';
import { NsFormModule } from '../../form/ns-form.module';
import { NsIconModule } from '../../icon/ns-icon.module';
import { NsLoadingModule } from '../../loading/ns-loading.module';
import { NsPageErrorsModule } from '../errors/ns-page-errors.module';
import { NsPageStandardComponent } from './ns-page-standard.component';

@NgModule({
  declarations: [NsPageStandardComponent],
  imports: [
    CommonModule,
    NsLoadingModule,
    MatCardModule,
    MatListModule,
    NsPageErrorsModule,
    NsFormModule,
    NsButtonModule,
    FlexModule,
    NsIconModule,
  ],
  exports: [NsPageStandardComponent],
})
export class NsPageStandardModule {}
