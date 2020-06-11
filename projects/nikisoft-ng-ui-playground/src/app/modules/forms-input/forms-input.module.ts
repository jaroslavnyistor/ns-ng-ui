import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsFormModule } from '../../../../../nikisoft-ng-ui/src/lib/form/ns-form.module';
import { NsGridModule } from '../../../../../nikisoft-ng-ui/src/lib/grid/ns-grid.module';
import { NsPageStandardModule } from '../../../../../nikisoft-ng-ui/src/lib/page/standard/ns-page-standard.module';
import { AppComponentModule } from '../../components/app-component.module';

import { FormsInputRoutingModule } from './forms-input-routing.module';
import { FormsInputComponent } from './forms-input.component';
import { FormsInputBasicComponent } from './basic/forms-input-basic.component';
import { FormsInputDependsOnComponent } from './depends-on/forms-input-depends-on.component';

@NgModule({
  declarations: [FormsInputComponent, FormsInputBasicComponent, FormsInputDependsOnComponent],
  imports: [
    CommonModule,
    FormsInputRoutingModule,
    NsPageStandardModule,
    AppComponentModule,
    NsFormModule,
    NsGridModule,
  ],
})
export class FormsInputModule {}
