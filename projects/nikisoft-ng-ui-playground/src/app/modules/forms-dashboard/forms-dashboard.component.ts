import { Component } from '@angular/core';
import { NsDashboardDiConfigurator } from '../../../../../nikisoft-ng-ui/src/lib/dasboard/ns-dashboard.di-configurator';
import { FormsDashboardModel } from './forms-dashboard.model';
import { FormsDashboardService } from './forms-dashboard.service';

@Component({
  selector: 'forms-dashboard',
  template: ` <ns-dashboard></ns-dashboard> `,
  styles: [],
  providers: [NsDashboardDiConfigurator.provideService(FormsDashboardService, FormsDashboardModel)],
})
export class FormsDashboardComponent {}
