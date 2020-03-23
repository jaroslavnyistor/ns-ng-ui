import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule, MatListModule } from '@angular/material';
import { NsLoadingModule } from '../../loading/ns-loading.module';
import { NsPageErrorsModule } from '../errors/ns-page-errors.module';
import { NsPageEditStepsComponent } from './ns-page-edit-steps.component';

@NgModule({
   declarations: [
      NsPageEditStepsComponent
   ],
   imports: [
      CommonModule,
      NsLoadingModule,
      MatCardModule,
      FlexModule,
      MatListModule,
      NsPageErrorsModule
   ],
   exports: [
      NsPageEditStepsComponent
   ]
})
export class NsPageEditStepsModule {
}
