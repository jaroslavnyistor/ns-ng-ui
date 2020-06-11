import { Component } from '@angular/core';
import { NsPageStandardDiConfigurator } from '../../../../../nikisoft-ng-ui/src/lib/page/standard/ns-page-standard.di-configurator';
import { FormsInputModel } from './forms-input.model';
import { FormsInputService } from './forms-input.service';

@Component({
  selector: 'forms-input',
  templateUrl: './forms-input.component.html',
  styles: [],
  providers: [NsPageStandardDiConfigurator.provideService(FormsInputService, FormsInputModel)],
})
export class FormsInputComponent {}
