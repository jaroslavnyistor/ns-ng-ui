import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocalizationLanguagesService } from '../../../utils/localization/localization-languages.service';

export interface NsFormControlDefinition {
   key: string;

   tabIndex: number;

   formControl: AbstractControl;

   hasValue: boolean;

   valueChanges$: Observable<any>;

   setLangService(langService: LocalizationLanguagesService);

   onInit();

   onDestroy();
}
