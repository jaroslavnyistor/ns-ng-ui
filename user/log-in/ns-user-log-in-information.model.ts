import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, mergeMap, switchMap } from 'rxjs/operators';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsButtonDefaultModel } from '../../button/default/ns-button-default.model';
import { NsButtonType } from '../../button/ns-button-type';
import { NsButtonRaisedModel } from '../../button/raised/ns-button-raised.model';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsServiceProviderComponentModel } from '../../ns-service-provider-component.model';
import { loginRoute } from '../../page/login/login.routes';

@Injectable()
export class NsUserLogInInformationModel extends NsServiceProviderComponentModel<NsServiceProvider, NsNavigationService> {
   private readonly _loginButton: NsButtonRaisedModel;
   private readonly _isLoginButtonVisible$: Observable<boolean>;
   private readonly _fullName$: Observable<string>;
   private readonly _additionalLines$: Observable<string[]>;

   get loginButton(): NsButtonDefaultModel {
      return this._loginButton;
   }

   get isLoggedIn$(): Observable<boolean> {
      return this.authService.isLoggedIn$;
   }

   get isLoginButtonVisible$(): Observable<boolean> {
      return this._isLoginButtonVisible$;
   }

   get fullName$(): Observable<string> {
      return this._fullName$;
   }

   get additionalLines$(): Observable<string[]> {
      return this._additionalLines$;
   }

   constructor(
      serviceProvider: NsServiceProvider,
      router: Router
   ) {
      super(serviceProvider);

      this._loginButton = new NsButtonRaisedModel(
         serviceProvider.langService.translate(LocalizedTextIdNikisoft.LoginButton)
      );

      this._loginButton.type = NsButtonType.Accent;

      this._isLoginButtonVisible$ = this.getIsLoginButtonVisible$(router);

      this._fullName$ = this.getFullName$();

      this._additionalLines$ = this.getAdditionalLines$();
   }

   private getIsLoginButtonVisible$(router: Router) {
      return router.events
      .pipe(
         filter(routerEvent => routerEvent instanceof NavigationEnd),
         switchMap((routerEvent: NavigationEnd) => {
            const foundLoginSegment = routerEvent.url.indexOf(loginRoute);
            return of(foundLoginSegment > -1);
         }),
         mergeMap(isInLoginScreen => this.authService.isLoggedIn$
            .pipe(
               switchMap(isLoggedIn => of(!isLoggedIn && !isInLoginScreen))
            )
         )
      );
   }

   private getFullName$() {
      return this.authService.changes$
      .pipe(
         switchMap(auth => of(auth.fullName))
      );
   }

   private getAdditionalLines$() {
      return this.authService.changes$
      .pipe(
         switchMap(auth => of([
               auth.userName,
               auth.email
            ])
         )
      );
   }
}
