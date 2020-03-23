import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationLanguagesService } from '../../../../utils/localization/localization-languages.service';

@Pipe({
   name: 'translate'
})
export class TranslatePipe implements PipeTransform {
   constructor(private _langService: LocalizationLanguagesService) {
   }

   transform(value: any, ...args: any[]): string {
      return this._langService.text(value);
   }
}
