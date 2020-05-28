import { Route } from '@angular/router';

export const formsCheckboxRoute = 'forms-checkbox';

export const formsCheckboxRoutes: Route[] = [
  {
    path: formsCheckboxRoute,
    loadChildren: () => import('./forms-checkbox.module').then((m) => m.FormsCheckboxModule),
  },
];
