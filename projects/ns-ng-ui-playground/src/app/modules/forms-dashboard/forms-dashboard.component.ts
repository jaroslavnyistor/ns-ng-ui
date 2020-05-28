import { Component } from '@angular/core';
import { NsDashboardDiConfigurator } from 'ns-ng-ui';
import { FormsDashboardModel } from './forms-dashboard.model';
import { FormsDashboardService } from './forms-dashboard.service';

@Component({
   selector: 'forms-dashboard',
   template: `
      <ns-dashboard></ns-dashboard>
   `,
   styles: [],
   providers: [
      NsDashboardDiConfigurator.provideService(FormsDashboardService, FormsDashboardModel)
   ]
})
export class FormsDashboardComponent {
}
