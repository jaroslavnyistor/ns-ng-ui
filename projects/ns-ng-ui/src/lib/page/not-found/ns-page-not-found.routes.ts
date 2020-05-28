import { Route } from '@angular/router';
import { routeNotFound } from 'ns-js-utils';

export const notFoundRoutes: Route[] = [
  {
    path: routeNotFound,
    loadChildren: () => import('./ns-page-not-found.module').then((m) => m.NsPageNotFoundModule),
  },
  {
    path: '**',
    redirectTo: routeNotFound,
  },
];

export function buildDefaultRoute(redirectTo = routeNotFound) {
  return {
    path: '',
    redirectTo,
    pathMatch: 'full',
  };
}
