import { Component } from '@angular/core';
import { NsDashboardDiConfigurator } from '../../../../../nikisoft-ng-ui/src/lib/dasboard/ns-dashboard.di-configurator';
import { HomeModel } from './home.model';
import { HomeService } from './home.service';

@Component({
  selector: 'home',
  template: ` <ns-dashboard></ns-dashboard> `,
  styles: [],
  providers: [NsDashboardDiConfigurator.provideService(HomeService, HomeModel)],
})
export class HomeComponent {}
