import { Route } from '@angular/router';
import { routeNotFound } from 'nikisoft-utils';

export function getNotFoundRoutes(): Route[] {
  return [
    {
      path: routeNotFound,
      loadChildren: () => import('./ns-page-not-found.module').then((m) => m.NsPageNotFoundModule),
    },
    {
      path: '**',
      redirectTo: routeNotFound,
    },
  ];
}

export function buildDefaultRoute(redirectTo = routeNotFound) {
  return {
    path: '',
    redirectTo,
    pathMatch: 'full',
  };
}
