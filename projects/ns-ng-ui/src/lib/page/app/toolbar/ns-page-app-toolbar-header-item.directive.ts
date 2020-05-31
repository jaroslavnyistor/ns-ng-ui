import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nsPageAppToolbarHeaderItem]',
})
export class NsPageAppToolbarHeaderItemDirective {
  constructor(public template: TemplateRef<any>) {}
}
