import { Component } from '@angular/core';
import { NsPageStandardDiConfigurator } from 'nikisoft-ng-ui';
import { FormsArrayModel } from './forms-array.model';
import { FormsArrayService } from './forms-array.service';

@Component({
  selector: 'forms-array',
  templateUrl: './forms-array.component.html',
  styles: [],
  providers: [NsPageStandardDiConfigurator.provideService(FormsArrayService, FormsArrayModel)],
})
export class FormsArrayComponent {}
