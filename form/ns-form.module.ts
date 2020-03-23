import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
   MatAutocompleteModule,
   MatButtonModule,
   MatCheckboxModule,
   MatDatepickerModule,
   MatDividerModule,
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatStepperModule
} from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NsButtonModule } from '../button/ns-button.module';
import { NsIconModule } from '../icon/ns-icon.module';
import { NsLoadingModule } from '../loading/ns-loading.module';
import { LocalizationLanguagesModule } from '../localization/languages/localization-languages.module';
import { NsFormControlArrayItemTemplateDirective } from './controls/array/ns-form-control-array-item-template.directive';
import { NsFormControlArrayComponent } from './controls/array/ns-form-control-array.component';
import { NsFormControlAutocompleteComponent } from './controls/autocomplete/ns-form-control-autocomplete.component';
import { NsFormControlCheckboxComponent } from './controls/checkbox/ns-form-control-checkbox.component';
import { NsFormControlDateTimePickerComponent } from './controls/date-time/ns-form-control-date-time-picker.component';
import { NsFormControlDatePickerComponent } from './controls/date/ns-form-control-date-picker.component';
import { NsFormControlInputComponent } from './controls/input/ns-form-control-input.component';
import { NsFormControlNumberComponent } from './controls/number/ns-form-control-number.component';
import { NsFormControlSelectComponent } from './controls/select/ns-form-control-select.component';
import { NsFormControlTimePickerComponent } from './controls/time/ns-form-control-time-picker.component';
import { NsFormComponent } from './ns-form.component';
import { NsFormStepDirective } from './steps/ns-form-step.directive';
import { NsFormStepsButtonsComponent } from './steps/ns-form-steps-buttons.component';
import { NsFormStepsComponent } from './steps/ns-form-steps.component';

@NgModule({
   declarations: [
      NsFormComponent,
      NsFormControlInputComponent,
      NsFormControlNumberComponent,
      NsFormControlAutocompleteComponent,
      NsFormStepsComponent,
      NsFormStepDirective,
      NsFormStepsButtonsComponent,
      NsFormControlDatePickerComponent,
      NsFormControlCheckboxComponent,
      NsFormControlDateTimePickerComponent,
      NsFormControlTimePickerComponent,
      NsFormControlSelectComponent,
      NsFormControlArrayComponent,
      NsFormControlArrayItemTemplateDirective,
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      NsIconModule,
      MatAutocompleteModule,
      LocalizationLanguagesModule,
      MatStepperModule,
      NsButtonModule,
      MatDatepickerModule,
      MatDatepickerModule,
      MatCheckboxModule,
      FlexModule,
      NgxMaterialTimepickerModule,
      MatSelectModule,
      MatDividerModule,
      NsLoadingModule,
   ],
   exports: [
      NsFormComponent,
      ReactiveFormsModule,
      NsFormControlInputComponent,
      NsFormControlAutocompleteComponent,
      NsFormStepsComponent,
      NsFormStepDirective,
      NsFormControlDatePickerComponent,
      NsFormControlCheckboxComponent,
      NsFormControlDateTimePickerComponent,
      NsFormControlSelectComponent,
      NsFormControlArrayComponent,
      NsFormControlArrayItemTemplateDirective,
      NsFormControlNumberComponent,
   ]
})
export class NsFormModule {
}
