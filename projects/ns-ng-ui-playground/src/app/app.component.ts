import { Component } from '@angular/core';
import { NsPageDiConfigurator } from 'ns-ng-ui/lib/page/base/ns-page.di-configurator';
import { AppModel } from './app.model';
import { AppService } from './app.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.sass'],
   providers: [
      NsPageDiConfigurator.provideService(AppService, AppModel),
   ]
})
export class AppComponent {

}
