import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NsFormModule } from '../../../../../nikisoft-ng-ui/src/lib/form/ns-form.module';
import { NsGridModule } from '../../../../../nikisoft-ng-ui/src/lib/grid/ns-grid.module';
import { NsPageStandardModule } from '../../../../../nikisoft-ng-ui/src/lib/page/standard/ns-page-standard.module';
import { AppComponentModule } from '../../components/app-component.module';
import { FormsDateBasicComponent } from './basic/forms-date-basic.component';
import { FormsDateRoutingModule } from './forms-date-routing.module';
import { FormsDateComponent } from './forms-date.component';
import { FormsDateMinMaxComponent } from './min-max/forms-date-min-max.component';

@NgModule({
  declarations: [FormsDateComponent, FormsDateBasicComponent, FormsDateMinMaxComponent],
  imports: [CommonModule, FormsDateRoutingModule, NsPageStandardModule, NsFormModule, AppComponentModule, NsGridModule],
})
export class FormsDateModule {}
