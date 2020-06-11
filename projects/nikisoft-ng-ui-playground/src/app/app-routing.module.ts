import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getLoginRoutes } from '../../../nikisoft-ng-ui/src/lib/page/login/login.routes';
import { getRouteNoPermissionRoutes } from '../../../nikisoft-ng-ui/src/lib/page/no-permission/ns-page-no-permission.routes';
import {
  buildDefaultRoute,
  getNotFoundRoutes
} from '../../../nikisoft-ng-ui/src/lib/page/not-found/ns-page-not-found.routes';
import { formsArrayRoutes } from './modules/forms-array/forms-array.routes';
import { formsCheckboxRoutes } from './modules/forms-checkbox/forms-checkbox.routes';
import { formsDashboardRoutes } from './modules/forms-dashboard/forms-dashboard.routes';
import { formsAutocompleteRoutes } from './modules/forms-autocomplete/forms-autocomplete.routes';
import { formsDateRoutes } from './modules/forms-date/forms-date.routes';
import { formsInputRoutes } from './modules/forms-input/forms-input.routes';
import { homeRoute, homeRoutes } from './modules/home/home.routes';

const routes: Routes = [
  buildDefaultRoute(homeRoute),
  ...formsDashboardRoutes,
  ...formsArrayRoutes,
  ...formsAutocompleteRoutes,
  ...formsCheckboxRoutes,
  ...formsDateRoutes,
  ...formsInputRoutes,
  ...homeRoutes,
  ...getLoginRoutes(),
  ...getRouteNoPermissionRoutes(),
  ...getNotFoundRoutes(),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
