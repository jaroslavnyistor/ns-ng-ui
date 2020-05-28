import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsArrayComponent } from './forms-array.component';

const routes: Routes = [{ path: '', component: FormsArrayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsArrayRoutingModule {}
