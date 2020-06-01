import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsFormModule, NsGridModule, NsPageDefaultModule } from 'nikisoft-ng-ui';
import { AppComponentModule } from '../../components/app-component.module';

import { FormsInputRoutingModule } from './forms-input-routing.module';
import { FormsInputComponent } from './forms-input.component';
import { FormsInputBasicComponent } from './basic/forms-input-basic.component';
import { FormsInputDependsOnComponent } from './depends-on/forms-input-depends-on.component';

@NgModule({
  declarations: [FormsInputComponent, FormsInputBasicComponent, FormsInputDependsOnComponent],
  imports: [CommonModule, FormsInputRoutingModule, NsPageDefaultModule, AppComponentModule, NsFormModule, NsGridModule],
})
export class FormsInputModule {}
