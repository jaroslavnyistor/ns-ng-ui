import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NsDashboardModule } from '../../../../../nikisoft-ng-ui/src/lib/dasboard/ns-dashboard.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, NsDashboardModule],
})
export class HomeModule {}
