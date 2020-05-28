import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NsIconModule } from '../../icon/ns-icon.module';
import { NsLoadingModule } from '../../loading/ns-loading.module';
import { LocalizationLanguagesModule } from '../../localization/languages/localization-languages.module';
import { NsPageErrorsModule } from '../../page/errors/ns-page-errors.module';
import { NsCalendarsMonthDayDirective } from './days/ns-calendars-month-day.directive';
import { NsCalendarsMonthDaysComponent } from './days/ns-calendars-month-days.component';
import { NsCalendarsMonthHeadersComponent } from './headers/ns-calendars-month-headers.component';
import { NsCalendarsMonthRightPanelDirective } from './ns-calendars-month-right-panel.directive';
import { NsCalendarsMonthComponent } from './ns-calendars-month.component';
import { NsCalendarsMonthToolbarComponent } from './toolbar/ns-calendars-month-toolbar.component';
import { NsCalendarsMonthToolbarDirective } from './toolbar/ns-calendars-month-toolbar.directive';


@NgModule({
   declarations: [
      NsCalendarsMonthComponent,
      NsCalendarsMonthToolbarComponent,
      NsCalendarsMonthHeadersComponent,
      NsCalendarsMonthDaysComponent,
      NsCalendarsMonthDayDirective,
      NsCalendarsMonthToolbarDirective,
      NsCalendarsMonthRightPanelDirective
   ],
   exports: [
      NsCalendarsMonthComponent,
      NsCalendarsMonthDayDirective,
      NsCalendarsMonthToolbarDirective,
      NsCalendarsMonthRightPanelDirective,
   ],
   imports: [
      CommonModule,
      NsIconModule,
      FlexModule,
      NsLoadingModule,
      NsPageErrorsModule,
      MatSidenavModule,
      LocalizationLanguagesModule,
      MatTooltipModule,
      ExtendedModule,
   ]
})
export class NsCalendarsMonthModule {
}
