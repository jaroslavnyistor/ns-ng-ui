import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NsDashboardModule } from '../../../../../nikisoft-ng-ui/src/lib/dasboard/ns-dashboard.module';
import { FormsDashboardRoutingModule } from './forms-dashboard-routing.module';
import { FormsDashboardComponent } from './forms-dashboard.component';

@NgModule({
  declarations: [FormsDashboardComponent],
  imports: [CommonModule, FormsDashboardRoutingModule, NsDashboardModule],
})
export class FormsDashboardModule {}
