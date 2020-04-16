import { Injectable } from '@angular/core';
import { NsAuthenticateResponseModel } from '../../../utils/authentication/ns-authenticate-response.model';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsButtonDefaultModel } from '../../button/default/ns-button-default.model';
import { NsButtonType } from '../../button/ns-button-type';
import { NsButtonRaisedModel } from '../../button/raised/ns-button-raised.model';
import { NsComponentModel } from '../../component/ns-component.model';
import { NsServiceProvider } from '../../ns-service-provider';

@Injectable()
export class NsUserLogInInformationModel extends NsComponentModel {
   private readonly _loginButton: NsButtonRaisedModel;
   private _credentials: NsAuthenticateResponseModel;
   private _additionalLines = [];

   get isLoggedIn(): boolean {
      return this._credentials.isLoggedIn;
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

   constructor(serviceProvider: NsServiceProvider) {
      super();

      this._loginButton = new NsButtonRaisedModel(
         serviceProvider.langService.text(LocalizedTextIdNikisoft.LoginButton)
      );
      this._loginButton.type = NsButtonType.Accent;
   }
}
