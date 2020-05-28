import { Component } from '@angular/core';
import { NsPageDefaultDiConfigurator } from 'ns-ng-ui';
import { FormsArrayModel } from './forms-array.model';
import { FormsArrayService } from './forms-array.service';

@Component({
  selector: 'forms-array',
  templateUrl: './forms-array.component.html',
  styles: [  ],
  providers: [
     NsPageDefaultDiConfigurator.provideService(FormsArrayService, FormsArrayModel),
  ]
})
export class FormsArrayComponent {
}
