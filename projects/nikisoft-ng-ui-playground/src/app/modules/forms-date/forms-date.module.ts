import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NsFormModule } from 'nikisoft-ng-ui';
import { NsPageStandardModule } from 'nikisoft-ng-ui';
import { AppComponentModule } from '../../components/app-component.module';
import { FormsDateBasicComponent } from './basic/forms-date-basic.component';
import { FormsDateRoutingModule } from './forms-date-routing.module';
import { FormsDateComponent } from './forms-date.component';

@NgModule({
  declarations: [
    FormsDateComponent,
    FormsDateBasicComponent
  ],
  imports: [
    CommonModule,
    FormsDateRoutingModule,
    NsPageStandardModule,
    NsFormModule,
    AppComponentModule
  ]
})
export class FormsDateModule {
}
