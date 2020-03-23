import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule, MatDividerModule } from '@angular/material';
import { NsDividerModule } from '../divider/ns-divider.module';
import { NsCardComponent } from './ns-card.component';


@NgModule({
   declarations: [NsCardComponent],
   imports: [
      CommonModule,
      MatCardModule,
      FlexModule,
      MatDividerModule,
      NsDividerModule
   ],
   exports: [NsCardComponent]
})
export class NsCardModule {
}
