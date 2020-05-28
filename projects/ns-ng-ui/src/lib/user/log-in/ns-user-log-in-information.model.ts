import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { loginRoute, NsNavigationService } from 'ns-js-utils';
import { Observable, of } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { NsIcon } from '../../icon/ns-icon.enum';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsServiceProviderComponentModel } from '../../service-provider/ns-service-provider-component.model';

@Injectable()
export class NsUserLogInInformationModel
   extends NsServiceProviderComponentModel<NsServiceProvider<NsNavigationService>, NsNavigationService> {
   private readonly _loginIcon = NsIcon.Action_Input;
   private readonly _isLoginButtonVisible$: Observable<boolean>;
   private readonly _fullName$: Observable<string>;
   private readonly _additionalLines$: Observable<string[]>;

   get loginIcon(): NsIcon {
      return this._loginIcon;
   }

   get isLoginButtonVisible$(): Observable<boolean> {
      return this._isLoginButtonVisible$;
   }

   get isLoggedIn$(): Observable<boolean> {
      return this.authService.isLoggedIn$;
   }

   get fullName$(): Observable<string> {
      return this._fullName$;
   }

   get additionalLines$(): Observable<string[]> {
      return this._additionalLines$;
   }

   constructor(serviceProvider: NsServiceProvider<NsNavigationService>, router: Router) {
      super(serviceProvider);

      this._isLoginButtonVisible$ = this.getIsLoginButtonVisible$(router);

      this._fullName$ = this.getFullName$();

      this._additionalLines$ = this.getAdditionalLines$();
   }

   private getIsLoginButtonVisible$(router: Router): Observable<boolean> {
      return router.events
         .pipe(
            filter(routerEvent => routerEvent instanceof NavigationEnd),
            flatMap((routerEvent: NavigationEnd) => {
               const foundLoginSegment = routerEvent.url.indexOf(loginRoute);
               return of(foundLoginSegment > -1);
            }),
            flatMap(isInLoginScreen => this.authService.isLoggedIn$
               .pipe(
                  map(isLoggedIn => (!isLoggedIn && !isInLoginScreen))
               )
            )
         );
   }

   private getFullName$() {
      return this.authService.changes$
         .pipe(
            flatMap(auth => of(auth.fullName))
         );
   }

   private getAdditionalLines$() {
      return this.authService.changes$
         .pipe(
            flatMap(auth => of([auth.userName, auth.email])
            )
         );
   }
}
