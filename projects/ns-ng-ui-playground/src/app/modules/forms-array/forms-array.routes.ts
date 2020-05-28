import { Route } from '@angular/router';

export const formsArrayRoute = 'forms-array';

export const formsArrayRoutes: Route[] = [
   {
      path: formsArrayRoute,
      loadChildren: () => import('./forms-array.module')
         .then(m => m.FormsArrayModule)
   }
];
