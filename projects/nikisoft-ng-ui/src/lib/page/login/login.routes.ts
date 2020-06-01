import { Route } from '@angular/router';
import { loginRoute } from 'nikisoft-utils';

export function getLoginRoutes(): Route[] {
  return [
    {
      path: loginRoute,
      loadChildren: () => import('./login.module').then((m) => m.LoginModule),
    },
  ];
}
