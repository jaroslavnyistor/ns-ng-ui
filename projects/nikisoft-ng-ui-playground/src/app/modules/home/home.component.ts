import { Component } from '@angular/core';
import { NsDashboardDiConfigurator } from 'ns-ng-ui';
import { HomeModel } from './home.model';
import { HomeService } from './home.service';

@Component({
  selector: 'home',
  template: ` <ns-dashboard></ns-dashboard> `,
  styles: [],
  providers: [NsDashboardDiConfigurator.provideService(HomeService, HomeModel)],
})
export class HomeComponent {}
