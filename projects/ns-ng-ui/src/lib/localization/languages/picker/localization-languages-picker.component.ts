import { Component, Input } from '@angular/core';
import { LocalizationLanguagesService } from 'ns-js-utils';

@Component({
   selector: 'localization-languages-picker',
   templateUrl: './localization-languages-picker.component.html',
   styleUrls: ['./localization-languages-picker.component.sass']
})
export class LocalizationLanguagesPickerComponent {
   @Input() useLongNames = false;

   get service(): LocalizationLanguagesService {
      return this._service;
   }

   constructor(private _service: LocalizationLanguagesService) {
   }
}
