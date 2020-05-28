import { Component, Input } from '@angular/core';

@Component({
  selector: 'ns-loading-inline-normal',
  template: ` <ns-loading-inline diameter="24" [text]="text" style="line-height: 64px;"> </ns-loading-inline> `,
  styles: [':host { display: inline-block; }'],
})
export class NsLoadingInlineNormalComponent {
  @Input() text: string;
}
