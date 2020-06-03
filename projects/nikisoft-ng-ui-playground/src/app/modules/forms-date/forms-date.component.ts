import { Component } from '@angular/core';
import { NsPageStandardDiConfigurator } from 'nikisoft-ng-ui';
import { FormsDateModel } from './forms-date.model';
import { FormsDateService } from './forms-date.service';

@Component({
  selector: 'forms-date',
  templateUrl: './forms-date.component.html',
  styles: [],
  providers: [NsPageStandardDiConfigurator.provideService(FormsDateService, FormsDateModel)],
})
export class FormsDateComponent {}
