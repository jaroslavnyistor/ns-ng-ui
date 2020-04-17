import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NsExpansionPanelComponent } from './ns-expansion-panel.component';


@NgModule({
   declarations: [NsExpansionPanelComponent],
   imports: [
      CommonModule,
      MatExpansionModule
   ]
})
export class NsExpansionPanelModule {
}
