import { Route } from '@angular/router';
import { routeNoPermission } from 'nikisoft-utils';

export function getRouteNoPermissionRoutes(): Route[] {
  return [
    {
      path: routeNoPermission,
      loadChildren: () => import('./ns-page-no-permission.module').then((m) => m.NsPageNoPermissionModule),
    },
  ];
}
