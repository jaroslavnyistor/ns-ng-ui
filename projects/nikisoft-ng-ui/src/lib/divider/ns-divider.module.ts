import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { NsDividerComponent } from './ns-divider.component';

@NgModule({
  declarations: [NsDividerComponent],
  imports: [CommonModule, MatDividerModule],
  exports: [NsDividerComponent],
})
export class NsDividerModule {}
