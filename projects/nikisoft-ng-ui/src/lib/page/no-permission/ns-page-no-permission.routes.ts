import { Route } from '@angular/router';
import { routeNoPermission } from 'nikisoft-utils';

export const routeNoPermissionRoutes: Route[] = [
  {
    path: routeNoPermission,
    loadChildren: () => import('./ns-page-no-permission.module').then((m) => m.NsPageNoPermissionModule),
  },
];
