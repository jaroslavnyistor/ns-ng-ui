import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { NsGridColumnDirective } from './ns-grid-column.directive';
import { NsGridRowComponent } from './ns-grid-row.component';


@NgModule({
  declarations: [
    NsGridRowComponent,
    NsGridColumnDirective,
  ],
  exports: [
    NsGridRowComponent,
    NsGridColumnDirective,
  ],
  imports: [
    CommonModule,
    FlexModule,
    FlexLayoutModule,
  ]
})
export class NsGridModule { }
