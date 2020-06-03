import { Route } from '@angular/router';

export const formsDateRoute = 'forms-date';

export const formsDateRoutes: Route[] = [
  {
    path: formsDateRoute,
    loadChildren: () => import('./forms-date.module').then((m) => m.FormsDateModule),
  },
];
