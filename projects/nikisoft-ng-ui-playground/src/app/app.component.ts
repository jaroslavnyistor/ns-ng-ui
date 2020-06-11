import { Component } from '@angular/core';
import { NsPageAppDiConfigurator } from '../../../nikisoft-ng-ui/src/lib/page/app/ns-page-app.di-configurator';
import { AppModel } from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [NsPageAppDiConfigurator.provideService(AppService, AppModel)],
})
export class AppComponent {}
