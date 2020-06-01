import { Component } from '@angular/core';
import { NsPageDefaultDiConfigurator } from 'nikisoft-ng-ui';
import { FormsInputModel } from './forms-input.model';
import { FormsInputService } from './forms-input.service';

@Component({
  selector: 'forms-input',
  templateUrl: './forms-input.component.html',
  styles: [],
  providers: [NsPageDefaultDiConfigurator.provideService(FormsInputService, FormsInputModel)],
})
export class FormsInputComponent {}
