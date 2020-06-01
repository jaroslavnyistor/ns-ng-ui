import { Component, Input } from '@angular/core';

@Component({
  selector: 'ns-loading-inline-small',
  template: ` <ns-loading-inline diameter="16" [text]="text"> </ns-loading-inline> `,
})
export class NsLoadingInlineSmallComponent {
  @Input() text: string;
}
