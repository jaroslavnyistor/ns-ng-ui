import { Route } from '@angular/router';

export const formsAutocompleteRoute = 'autocomplete';

export const formsAutocompleteRoutes: Route[] = [
   {
      path: formsAutocompleteRoute,
      loadChildren: () => import('./forms-autocomplete.module')
         .then(m => m.FormsAutocompleteModule)
   }
];
