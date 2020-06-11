import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { NsFormModule } from '../../../../../nikisoft-ng-ui/src/lib/form/ns-form.module';
import { NsGridModule } from '../../../../../nikisoft-ng-ui/src/lib/grid/ns-grid.module';
import { NsPageStandardModule } from '../../../../../nikisoft-ng-ui/src/lib/page/standard/ns-page-standard.module';
import { AppComponentModule } from '../../components/app-component.module';
import { FormsArrayBasicComponent } from './basic/forms-array-basic.component';
import { FormsArrayCustomersArrayComponent } from './customers/forms-array-customers-array.component';

import { FormsArrayRoutingModule } from './forms-array-routing.module';
import { FormsArrayComponent } from './forms-array.component';
import { FormsArrayInitialValueComponent } from './initial-value/forms-array-initial-value.component';

@NgModule({
  declarations: [
    FormsArrayComponent,
    FormsArrayBasicComponent,
    FormsArrayCustomersArrayComponent,
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
