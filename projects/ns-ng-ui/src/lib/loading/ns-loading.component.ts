import { Component } from '@angular/core';

@Component({
   selector: 'ns-loading',
   template: `
      <div class="overlay"></div>
      <div class="loader ns-loader-color"></div>
   `,
   styleUrls: ['./ns-loading.component.sass']
})
export class NsLoadingComponent {
}
