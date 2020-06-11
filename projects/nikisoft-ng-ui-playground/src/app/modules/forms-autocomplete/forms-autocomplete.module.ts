import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NsFormModule } from '../../../../../nikisoft-ng-ui/src/lib/form/ns-form.module';
import { NsPageStandardModule } from '../../../../../nikisoft-ng-ui/src/lib/page/standard/ns-page-standard.module';
import { AppComponentModule } from '../../components/app-component.module';
import { FormsAutocompleteBasicComponent } from './basic/forms-autocomplete-basic.component';

import { FormsAutocompleteRoutingModule } from './forms-autocomplete-routing.module';
import { FormsAutocompleteComponent } from './forms-autocomplete.component';

@NgModule({
  declarations: [FormsAutocompleteComponent, FormsAutocompleteBasicComponent],
  imports: [CommonModule, FormsAutocompleteRoutingModule, NsFormModule, NsPageStandardModule, AppComponentModule],
})
export class FormsAutocompleteModule {}
