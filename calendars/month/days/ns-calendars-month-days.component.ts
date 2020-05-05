import { Component, Input, TemplateRef } from '@angular/core';
import { NsCalendarsMonthModel } from '../ns-calendars-month.model';
import { NsCalendarsMonthService } from '../ns-calendars-month.service';

@Component({
   selector: 'ns-calendars-month-days',
   templateUrl: './ns-calendars-month-days.component.html',
   styleUrls: ['./ns-calendars-month-days.component.sass']
})
export class NsCalendarsMonthDaysComponent {
   @Input() dataItemTemplate: TemplateRef<any>;

   @Input() service: NsCalendarsMonthService<any, any, any>;

   get model(): NsCalendarsMonthModel<any, any> {
      return this.service.model;
   }
}
