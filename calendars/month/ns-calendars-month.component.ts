import { Component, ContentChild, TemplateRef } from '@angular/core';
import { NsComponentBase } from '../../component/ns-component.base';
import { NsCalendarsMonthDayDirective } from './days/ns-calendars-month-day.directive';
import { NsCalendarsMonthRightPanelDirective } from './ns-calendars-month-right-panel.directive';
import { NsCalendarsMonthModel } from './ns-calendars-month.model';
import { NsCalendarsMonthService } from './ns-calendars-month.service';
import { NsCalendarsMonthToolbarDirective } from './toolbar/ns-calendars-month-toolbar.directive';

@Component({
   selector: 'ns-calendars-month',
   templateUrl: './ns-calendars-month.component.html',
   styleUrls: ['./ns-calendars-month.component.sass'],
})
export class NsCalendarsMonthComponent
   extends NsComponentBase<NsCalendarsMonthService<any, any>, NsCalendarsMonthModel<any>> {
   @ContentChild(NsCalendarsMonthDayDirective, { read: TemplateRef, static: true }) dataItemTemplate: TemplateRef<any>;

   @ContentChild(NsCalendarsMonthToolbarDirective, {
      read: TemplateRef,
      static: true
   }) toolbarTemplate: TemplateRef<any>;

   @ContentChild(NsCalendarsMonthRightPanelDirective, {
      read: TemplateRef,
      static: true
   }) rightPanelTemplate: TemplateRef<any>;

   get hasRightPanelTemplate(): boolean {
      return this.rightPanelTemplate != null;
   }

   constructor(service: NsCalendarsMonthService<any, any>) {
      super(service);
   }
}
