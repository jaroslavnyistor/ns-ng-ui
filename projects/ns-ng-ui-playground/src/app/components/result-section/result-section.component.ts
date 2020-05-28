import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
   selector: 'result-section',
   templateUrl: './result-section.component.html',
   styles: [
         `
         ns-expansion-panel {
            display: block;
            margin-top: 16px;
         }

         .status {
            margin-top: 16px;
         }
         `
   ]
})
export class ResultSectionComponent {
   @Input()
   value: any;

   @Input()
   status$: Observable<any>;
}
