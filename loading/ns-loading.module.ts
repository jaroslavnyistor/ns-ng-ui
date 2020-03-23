import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { NsLoadingInlineNormalComponent } from './inline/normal/ns-loading-inline-normal.component';
import { NsLoadingInlineComponent } from './inline/ns-loading-inline.component';
import { NsLoadingInlineSmallComponent } from './inline/small/ns-loading-inline-small.component';
import { NsLoadingComponent } from './ns-loading.component';

@NgModule({
   declarations: [
      NsLoadingComponent,
      NsLoadingInlineComponent,
      NsLoadingInlineNormalComponent,
      NsLoadingInlineSmallComponent,
   ],
   imports: [
      CommonModule,
      MatProgressSpinnerModule,
      HttpClientModule,
   ],
   exports: [
      HttpClientModule,
      NsLoadingComponent,
      NsLoadingInlineComponent,
      NsLoadingInlineNormalComponent,
      NsLoadingInlineSmallComponent,
   ]
})
export class NsLoadingModule {
}
