import { Route } from '@angular/router';

export const routeNotFound = 'not-found';

export const notFoundRoutes: Route[] = [
   {
      path: routeNotFound,
      loadChildren: () => import('./ns-page-not-found.module')
         .then(m => m.NsPageNotFoundModule)
   },
   {
      path: '**',
      redirectTo: routeNotFound
   }
];

export function buildDefaultRoute(redirectTo = routeNotFound) {
   return {
      path: '',
      redirectTo,
      pathMatch: 'full'
   };
}
