import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtendedModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NsTableComponent } from './ns-table.component';
import { NsTableItemValueComponent } from './table-item-value/ns-table-item-value.component';

@NgModule({
  declarations: [NsTableComponent, NsTableItemValueComponent],
  imports: [CommonModule, MatTableModule, MatToolbarModule, ExtendedModule],
  exports: [NsTableComponent, NsTableItemValueComponent],
})
export class NsTableModule {}
