import { Route } from '@angular/router';
import { loginRoute } from 'ns-js-utils';

export const loginRoutes: Route[] = [
  {
    path: loginRoute,
    loadChildren: () => import('./login.module').then((m) => m.LoginModule),
  },
];
