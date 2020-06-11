import { Component } from '@angular/core';
import { FormsArrayCustomersArrayModel } from './forms-array-customers-array.model';

@Component({
  selector: 'forms-array-customers-array',
  templateUrl: './forms-array-customers-array.component.html',
  styles: [],
})
export class FormsArrayCustomersArrayComponent {
  constructor(readonly model: FormsArrayCustomersArrayModel) {}
}
