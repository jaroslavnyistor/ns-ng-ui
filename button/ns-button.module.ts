import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { NsButtonDefaultComponent } from './default/ns-button-default.component';
import { NsButtonRaisedComponent } from './raised/ns-button-raised.component';


@NgModule({
   declarations: [NsButtonDefaultComponent, NsButtonRaisedComponent],
   imports: [
      CommonModule,
      MatButtonModule
   ],
   exports: [NsButtonDefaultComponent, NsButtonRaisedComponent]
})
export class NsButtonModule {
}
