import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { NsCardModule } from '../card/ns-card.module';
import { NsPageListModule } from '../page/list/ns-page-list.module';
import { NsDashboardComponent } from './ns-dashboard.component';


@NgModule({
   declarations: [
      NsDashboardComponent
   ],
   imports: [
      CommonModule,
      NsPageListModule,
      NsCardModule,
      FlexModule,
      MatCardModule
   ],
   exports: [
      NsDashboardComponent
   ]
})
export class NsDashboardModule {
}
