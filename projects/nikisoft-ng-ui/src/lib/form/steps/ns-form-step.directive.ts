import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nsFormStep]',
})
export class NsFormStepDirective {
  @Input() nsFormStep: string;

  constructor(public ref: TemplateRef<any>) {}
}
