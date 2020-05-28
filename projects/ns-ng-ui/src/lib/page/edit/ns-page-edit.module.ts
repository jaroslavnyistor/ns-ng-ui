import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NsButtonModule } from '../../button/ns-button.module';
import { NsFormModule } from '../../form/ns-form.module';
import { NsLoadingModule } from '../../loading/ns-loading.module';
import { NsPageErrorsModule } from '../errors/ns-page-errors.module';
import { NsPageEditComponent } from './ns-page-edit.component';

@NgModule({
  declarations: [NsPageEditComponent],
  imports: [
    CommonModule,
    NsLoadingModule,
    MatCardModule,
    FlexModule,
    MatDividerModule,
    NsPageErrorsModule,
    NsFormModule,
    NsButtonModule,
  ],
  exports: [NsPageEditComponent, NsFormModule],
})
export class NsPageEditModule {}
