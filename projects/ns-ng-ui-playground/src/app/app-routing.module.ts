import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginRoutes } from 'ns-ng-ui/lib/page/login/login.routes';
import { routeNoPermissionRoutes } from 'ns-ng-ui/lib/page/no-permission/ns-page-no-permission.routes';
import { buildDefaultRoute, notFoundRoutes } from 'ns-ng-ui/lib/page/not-found/ns-page-not-found.routes';
import { formsArrayRoutes } from './modules/forms-array/forms-array.routes';
import { formsCheckboxRoutes } from './modules/forms-checkbox/forms-checkbox.routes';
import { formsDashboardRoutes } from './modules/forms-dashboard/forms-dashboard.routes';
import { formsAutocompleteRoutes } from './modules/forms-autocomplete/forms-autocomplete.routes';
import { formsInputRoutes } from './modules/forms-input/forms-input.routes';
import { homeRoute, homeRoutes } from './modules/home/home.routes';


const routes: Routes = [
   buildDefaultRoute(homeRoute),
   ...formsDashboardRoutes,
   ...formsArrayRoutes,
   ...formsAutocompleteRoutes,
   ...formsCheckboxRoutes,
   ...formsInputRoutes,
   ...homeRoutes,
   ...loginRoutes,
   ...routeNoPermissionRoutes,
   ...notFoundRoutes
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {
}
