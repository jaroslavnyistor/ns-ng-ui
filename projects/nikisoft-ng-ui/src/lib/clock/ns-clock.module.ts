import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NsClockComponent } from './ns-clock.component';

@NgModule({
  declarations: [NsClockComponent],
  imports: [CommonModule],
  exports: [NsClockComponent],
})
export class NsClockModule {}
