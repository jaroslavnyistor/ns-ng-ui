import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsDateComponent } from './forms-date.component';

const routes: Routes = [{ path: '', component: FormsDateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsDateRoutingModule {}
