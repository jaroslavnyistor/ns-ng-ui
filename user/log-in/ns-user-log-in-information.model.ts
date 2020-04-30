import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NsAuthenticateResponseModel } from '../../../utils/authentication/ns-authenticate-response.model';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsButtonDefaultModel } from '../../button/default/ns-button-default.model';
import { NsButtonType } from '../../button/ns-button-type';
import { NsButtonRaisedModel } from '../../button/raised/ns-button-raised.model';
import { NsComponentModel } from '../../component/ns-component.model';
import { NsServiceProvider } from '../../ns-service-provider';
import { loginRoute } from '../../page/login/login.routes';

@Injectable()
export class NsUserLogInInformationModel extends NsComponentModel {
   private readonly _loginButton: NsButtonRaisedModel;
   private _credentials: NsAuthenticateResponseModel;
   private _additionalLines = [];
   private _isInLoginScreen = true;

   get isLoggedIn(): boolean {
      return this._credentials.isLoggedIn;
   }

   get showLoginButton(): boolean {
      return !this.isLoggedIn && !this._isInLoginScreen;
   }

   get name(): string {
      return this._credentials.fullName;
   }

   get additionalLines(): any[] {
      return this._additionalLines;
   }

   set credentials(value: NsAuthenticateResponseModel) {
      this._credentials = value;

      this._additionalLines = [
         this._credentials.userName,
         this._credentials.email
      ];
   }

   get loginButton(): NsButtonDefaultModel {
      return this._loginButton;
   }

   constructor(serviceProvider: NsServiceProvider,
               private _router: Router) {
      super();

      this._loginButton = new NsButtonRaisedModel(
         serviceProvider.langService.translate(LocalizedTextIdNikisoft.LoginButton)
      );

      this._loginButton.type = NsButtonType.Accent;
   }

   onInit() {
      super.onInit();

      this.subscribeTo(
         this._router.events
            .pipe(
               filter(routerEvent => routerEvent instanceof NavigationEnd)
            ),
         {
            next: (routerEvent: NavigationEnd) => {
               const foundLoginSegment = routerEvent.url.indexOf(loginRoute);
               this._isInLoginScreen = foundLoginSegment > -1;
            }
         }
      )
   }
}
