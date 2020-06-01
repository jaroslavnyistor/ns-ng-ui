import { Route } from '@angular/router';

export const formsDashboardRoute = 'forms-dashboard';

export const formsDashboardRoutes: Route[] = [
  {
    path: formsDashboardRoute,
    loadChildren: () => import('./forms-dashboard.module').then((m) => m.FormsDashboardModule),
  },
];
