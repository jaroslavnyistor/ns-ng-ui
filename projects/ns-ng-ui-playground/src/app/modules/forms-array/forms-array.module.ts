import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { NsFormModule, NsGridModule, NsPageDefaultModule } from 'ns-ng-ui';
import { AppComponentModule } from '../../components/app-component.module';
import { FormsArrayInitialValueComponent } from './initial-value/forms-array-initial-value.component';
import { FormsArrayBasicComponent } from './basic/forms-array-basic.component';
import { CustomersArrayComponent } from './customers/customers-array.component';

import { FormsArrayRoutingModule } from './forms-array-routing.module';
import { FormsArrayComponent } from './forms-array.component';


@NgModule({
   declarations: [
      FormsArrayComponent,
      FormsArrayBasicComponent,
      CustomersArrayComponent,
      FormsArrayInitialValueComponent
   ],
   imports: [
      CommonModule,
      FormsArrayRoutingModule,
      NsPageDefaultModule,
      NsFormModule,
      FlexModule,
      AppComponentModule,
      NsGridModule,
   ]
})
export class FormsArrayModule {
}
