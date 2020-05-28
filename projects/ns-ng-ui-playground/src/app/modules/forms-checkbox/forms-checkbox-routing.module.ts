import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsCheckboxComponent } from './forms-checkbox.component';


const routes: Routes = [
   { path: '', component: FormsCheckboxComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class FormsCheckboxRoutingModule {
}
