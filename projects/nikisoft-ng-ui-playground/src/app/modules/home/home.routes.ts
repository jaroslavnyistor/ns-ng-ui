import { Route } from '@angular/router';

export const homeRoute = 'home';

export const homeRoutes: Route[] = [
  {
    path: homeRoute,
    loadChildren: () => import('./home.module').then((m) => m.HomeModule),
  },
];
