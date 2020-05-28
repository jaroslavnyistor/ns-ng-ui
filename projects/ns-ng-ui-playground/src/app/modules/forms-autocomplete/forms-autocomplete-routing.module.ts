import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsAutocompleteComponent } from './forms-autocomplete.component';


const routes: Routes = [
   { path: '', component: FormsAutocompleteComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class FormsAutocompleteRoutingModule {
}
