import { Component, Input } from '@angular/core';
import { NsCalendarsMonthModel } from '../ns-calendars-month.model';
import { NsCalendarsMonthService } from '../ns-calendars-month.service';

@Component({
   selector: 'ns-calendars-month-headers',
   templateUrl: './ns-calendars-month-headers.component.html',
   styleUrls: ['./ns-calendars-month-headers.component.sass']
})
export class NsCalendarsMonthHeadersComponent {
   @Input() service: NsCalendarsMonthService<any, any>;

   get model(): NsCalendarsMonthModel<any> {
      return this.service.model;
   }
}
