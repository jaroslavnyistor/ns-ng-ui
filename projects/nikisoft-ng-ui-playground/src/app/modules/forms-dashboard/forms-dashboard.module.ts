import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NsDashboardModule } from 'ns-ng-ui';

import { FormsDashboardRoutingModule } from './forms-dashboard-routing.module';
import { FormsDashboardComponent } from './forms-dashboard.component';

@NgModule({
  declarations: [FormsDashboardComponent],
  imports: [CommonModule, FormsDashboardRoutingModule, NsDashboardModule],
})
export class FormsDashboardModule {}
