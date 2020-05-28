import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsInputComponent } from './forms-input.component';

const routes: Routes = [{ path: '', component: FormsInputComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsInputRoutingModule {}
