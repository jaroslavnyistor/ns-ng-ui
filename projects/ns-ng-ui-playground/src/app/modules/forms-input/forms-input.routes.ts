import { Route } from '@angular/router';

export const formsInputRoute = 'forms-input';

export const formsInputRoutes: Route[] = [
   {
      path: formsInputRoute,
      loadChildren: () => import('./forms-input.module')
         .then(m => m.FormsInputModule)
   }
];
