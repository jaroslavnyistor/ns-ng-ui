import { Directive, TemplateRef } from '@angular/core';

@Directive({
   selector: '[nsPageListToolbarItem]'
})
export class NsPageListToolbarItemDirective {
   constructor(public templateRef: TemplateRef<any>) {
   }
}
