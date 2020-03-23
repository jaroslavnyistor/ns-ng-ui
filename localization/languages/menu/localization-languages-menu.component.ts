import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { LocalizationLanguagesService } from '../../../../utils/localization/localization-languages.service';

@Component({
   selector: 'localization-languages-menu',
   templateUrl: './localization-languages-menu.component.html',
   styles: []
})
export class LocalizationLanguagesMenuComponent {
   @ViewChild('trigger', { static: true }) trigger: MatMenuTrigger;

   get service(): LocalizationLanguagesService {
      return this._service;
   }

   constructor(private _service: LocalizationLanguagesService) {
   }

   openMenu() {
      this.trigger.openMenu();
   }
}
