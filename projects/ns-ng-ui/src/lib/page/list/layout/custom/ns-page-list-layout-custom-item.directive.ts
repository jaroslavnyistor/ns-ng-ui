import { Directive, TemplateRef } from '@angular/core';

@Directive({
   selector: '[nsPageListLayoutCustomItem]'
})
export class NsPageListLayoutCustomItemDirective {

   constructor(public templateRef: TemplateRef<any>) {
   }

}
