import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocalizationLanguagesService } from 'ns-js-utils';
import { NsFormArray } from './array/ns-form-array';
import { NsFormGroup } from './group/ns-form-group';
import { NsFormControl } from './ns-form-control';

export type NsAbstractControl = NsFormControl | NsFormArray | NsFormGroup;

export interface NsFormControlDefinition {
  key: string;

  formControl: AbstractControl;

  hasValue: boolean;

  value: any;

  valueChanges$: Observable<any>;

  setLangService(langService: LocalizationLanguagesService);

  setFormControl(formControl: NsAbstractControl);

  onInit();

  onDestroy();

  onValuePatch(value: any);
}
