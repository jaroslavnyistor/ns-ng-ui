import { Component } from '@angular/core';

@Component({
  selector: 'ns-divider',
  template: ` <hr /> `,
  styles: [
    `
      hr {
        border-top: 1px solid #e5e5e5;
        border-left: none;
        border-right: none;
        border-bottom: none;
      }
    `,
  ],
})
export class NsDividerComponent {}
