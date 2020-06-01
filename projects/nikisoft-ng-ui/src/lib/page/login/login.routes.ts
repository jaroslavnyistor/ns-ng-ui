import { Route } from '@angular/router';
import { loginRoute } from 'nikisoft-utils';

export const loginRoutes: Route[] = [
  {
    path: loginRoute,
    loadChildren: () => import('./login.module').then((m) => m.LoginModule),
  },
];
