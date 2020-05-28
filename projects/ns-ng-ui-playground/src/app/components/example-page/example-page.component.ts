import { Component, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
   selector: 'example-page',
   templateUrl: './example-page.component.html',
   styles: [
         `
         :host {
            display: block;
            margin: 0 16px;
         }
         `
   ]
})
export class ExamplePageComponent {
   @Input()
   pageTitle: string;

   @Input()
   pageDescription: string;

   @Input()
   pageDescriptionTemplate: TemplateRef<any>;

   @Input()
   value: any;

   @Input()
   status$: Observable<any>;
}
