import { Route } from '@angular/router';

export const loginRoute = 'Login';

export const loginRoutes: Route[] = [
   {
      path: loginRoute,
      loadChildren: () => import('./login.module')
         .then(m => m.LoginModule)
   }
];
