import { Directive, TemplateRef } from '@angular/core';

@Directive({
   selector: '[nsPageListLayoutCustom]'
})
export class NsPageListLayoutCustomDirective {
   constructor(public templateRef: TemplateRef<any>) {
   }
}
