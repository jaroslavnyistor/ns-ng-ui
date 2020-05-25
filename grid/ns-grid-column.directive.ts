import { Directive, TemplateRef } from '@angular/core';

@Directive({
   selector: '[nsGridColumn]'
})
export class NsGridColumnDirective {
   constructor(public ref: TemplateRef<any>) {
   }
}
