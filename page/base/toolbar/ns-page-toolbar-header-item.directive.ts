import { Directive, TemplateRef } from '@angular/core';

@Directive({
   selector: '[nsPageToolbarHeaderItem]'
})
export class NsPageToolbarHeaderItemDirective {
   constructor(public template: TemplateRef<any>) {
   }
}
