import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NsAuthenticateResponseEntity } from '../../../utils/authentication/ns-authenticate-response.entity';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsPageEditService } from '../edit/ns-page-edit.service';
import { LoginEntity, newLoginEntity } from './login.entity';
import { LoginModel } from './login.model';

@Injectable()
export class LoginService extends NsPageEditService<LoginModel, LoginEntity, NsServiceProvider, NsNavigationService> {
   private _returnUrl = '';

   constructor(
      model: LoginModel,
      serviceProvider: NsServiceProvider,
      private _activatedRoute: ActivatedRoute
   ) {
      super(model, serviceProvider, _activatedRoute.params);
   }

   getLoadEntityObservable(entityId: number): Observable<LoginEntity> {
      return of(newLoginEntity());
   }

   onInit(): void {
      super.onInit();

      this.setupButtons();

      this.subscribeTo(this._activatedRoute.queryParams, this.getQueryParamsObserver());
   }

   private getQueryParamsObserver() {
      return {
         next: (result: Params) => {
            this._returnUrl = result.returnUrl || '';

            if (this.authService.isLoggedIn) {
               this.navService.toReturnUrl(this._returnUrl);
            }
         }
      };
   }

   private setupButtons() {
      this.model.negativeButton.isVisible = false;
      this.model.positiveButton.text = this.langService.translate(LocalizedTextIdNikisoft.LoginButton);
   }

   protected performSave(model: LoginModel): Observable<any> {
      const entity = model.entityToSave;
      return this.authService.authenticate(
         entity.userName,
         entity.password
      );
   }

   finishEditing(result?: NsAuthenticateResponseEntity) {
      this.authService.login(result, this._returnUrl);
   }
}
