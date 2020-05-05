import { Injectable } from '@angular/core';
import { nsAuthenticateResponseErrorResolver } from '../../../utils/authentication/ns-authenticate-response.error';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsFormControlInputModel } from '../../form/controls/input/ns-form-control-input.model';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsPageEditModel } from '../edit/ns-page-edit.model';
import { LoginEntity, newLoginEntity } from './login.entity';

const keyState = 'login';

@Injectable()
export class LoginModel extends NsPageEditModel<LoginEntity, NsServiceProvider, NsNavigationService> {
   private readonly _userName: NsFormControlInputModel<LoginEntity>;
   private readonly _password: NsFormControlInputModel<LoginEntity>;

   get userName(): NsFormControlInputModel<LoginEntity> {
      return this._userName;
   }

   get password(): NsFormControlInputModel<LoginEntity> {
      return this._password;
   }

   constructor(serviceProvider: NsServiceProvider) {
      super(newLoginEntity(), nsAuthenticateResponseErrorResolver, serviceProvider);

      this._userName = this.addText({
         key: 'userName',
         labelId: LocalizedTextIdNikisoft.UserName,
         isRequired: true
      });

      this._password = this.addPassword({
         key: 'password',
         labelId: LocalizedTextIdNikisoft.Password,
         isRequired: true
      });
   }

   getStateKey(): string {
      return keyState;
   }

   getState(): any {
      return null;
   }

   setState(state: any) {
   }
}
