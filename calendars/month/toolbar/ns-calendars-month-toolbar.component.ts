import { Component, Input, TemplateRef } from '@angular/core';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { NsCalendarsMonthModel } from '../ns-calendars-month.model';
import { NsCalendarsMonthService } from '../ns-calendars-month.service';

@Component({
   selector: 'ns-calendars-month-toolbar',
   templateUrl: './ns-calendars-month-toolbar.component.html',
   styleUrls: ['./ns-calendars-month-toolbar.component.sass']
})
export class NsCalendarsMonthToolbarComponent {
   NsIcon = NsIcon;

   @Input() toolbarTemplate: TemplateRef<any>;

   @Input() service: NsCalendarsMonthService<any, any>;

   get model(): NsCalendarsMonthModel<any> {
      return this.service.model;
   }
}
