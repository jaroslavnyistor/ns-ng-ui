import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsButtonModule, NsExpansionPanelModule } from 'nikisoft-ng-ui';
import { ResultSectionComponent } from './result-section/result-section.component';
import { ButtonPatchValueComponent } from './buttons/button-patch-value.component';
import { ButtonValidateComponent } from './buttons/button-validate.component';
import { ExamplePageComponent } from './example-page/example-page.component';

@NgModule({
  declarations: [ResultSectionComponent, ButtonPatchValueComponent, ButtonValidateComponent, ExamplePageComponent],
  imports: [CommonModule, NsExpansionPanelModule, NsButtonModule],
  exports: [ResultSectionComponent, ButtonPatchValueComponent, ButtonValidateComponent, ExamplePageComponent],
})
export class AppComponentModule {}
