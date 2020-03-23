import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NsIconModule } from '../icon/ns-icon.module';
import { NsSearchInputComponent } from './input/ns-search-input.component';

@NgModule({
   declarations: [
      NsSearchInputComponent
   ],
   imports: [
      CommonModule,
      MatInputModule,
      NsIconModule,
      MatButtonModule,
      MatTooltipModule,
   ],
   exports: [
      NsSearchInputComponent
   ]
})
export class NsSearchModule {
}
