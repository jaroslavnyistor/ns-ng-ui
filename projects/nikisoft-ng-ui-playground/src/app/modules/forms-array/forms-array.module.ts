import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { NsPageStandardModule } from 'nikisoft-ng-ui';
import { NsFormModule, NsGridModule } from 'nikisoft-ng-ui';
import { AppComponentModule } from '../../components/app-component.module';
import { FormsArrayBasicComponent } from './basic/forms-array-basic.component';
import { CustomersArrayComponent } from './customers/customers-array.component';

import { FormsArrayRoutingModule } from './forms-array-routing.module';
import { FormsArrayComponent } from './forms-array.component';
import { FormsArrayInitialValueComponent } from './initial-value/forms-array-initial-value.component';

@NgModule({
  declarations: [
    FormsArrayComponent,
    FormsArrayBasicComponent,
    CustomersArrayComponent,
    FormsArrayInitialValueComponent,
  ],
  imports: [
    CommonModule,
    FormsArrayRoutingModule,
    NsPageStandardModule,
    NsFormModule,
    FlexModule,
    AppComponentModule,
    NsGridModule,
  ],
})
export class FormsArrayModule {}
