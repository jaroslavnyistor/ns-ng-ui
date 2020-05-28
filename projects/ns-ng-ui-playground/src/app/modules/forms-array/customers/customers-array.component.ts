import { Component } from '@angular/core';
import { CustomersArrayModel } from './customers-array.model';

@Component({
   selector: 'customers-array',
   templateUrl: './customers-array.component.html',
   styles: []
})
export class CustomersArrayComponent {
   constructor(readonly model: CustomersArrayModel) {
   }
}
