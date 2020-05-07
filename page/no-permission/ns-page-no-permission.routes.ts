import { Route } from '@angular/router';

export const routeNoPermission = 'no-permission';

export const routeNoPermissionRoutes: Route[] = [
   {
      path: routeNoPermission,
      loadChildren: () => import('./ns-page-no-permission.module')
         .then(m => m.NsPageNoPermissionModule)
   }
];
