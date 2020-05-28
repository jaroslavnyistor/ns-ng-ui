import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NsFormModule, NsPageDefaultModule } from 'ns-ng-ui';
import { AppComponentModule } from '../../components/app-component.module';
import { FormsCheckboxBasicComponent } from './basic/forms-checkbox-basic.component';

import { FormsCheckboxRoutingModule } from './forms-checkbox-routing.module';
import { FormsCheckboxComponent } from './forms-checkbox.component';


@NgModule({
   declarations: [FormsCheckboxComponent, FormsCheckboxBasicComponent],
   imports: [
      CommonModule,
      FormsCheckboxRoutingModule,
      NsPageDefaultModule,
      AppComponentModule,
      NsFormModule
   ]
})
export class FormsCheckboxModule {
}
