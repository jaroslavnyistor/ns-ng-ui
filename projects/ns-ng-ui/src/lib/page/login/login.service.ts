import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LocalizedTextIdNikisoft, NsAuthenticateResponseEntity, NsNavigationService } from 'ns-js-utils';
import { Observable, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsPageEditService } from '../edit/ns-page-edit.service';
import { LoginEntity, newLoginEntity } from './login.entity';
import { LoginModel } from './login.model';

@Injectable()
export class LoginService extends NsPageEditService<
  LoginModel,
  LoginEntity,
  NsServiceProvider<NsNavigationService>,
  NsNavigationService
> {
  private _returnUrl = '';

  constructor(
    model: LoginModel,
    serviceProvider: NsServiceProvider<NsNavigationService>,
    private _activatedRoute: ActivatedRoute,
  ) {
    super(model, serviceProvider, _activatedRoute.params);
  }

  getLoadEntityObservable(entityId: number): Observable<LoginEntity> {
    return of(newLoginEntity());
  }

  onInit(): void {
    super.onInit();

    this.setupButtons();

    this.handleQueryParams();
  }

  private handleQueryParams() {
    const obs$ = this._activatedRoute.queryParams.pipe(
      mergeMap((result: Params) =>
        this.authService.isLoggedIn$.pipe(
          switchMap((isLoggedIn: boolean) =>
            of({
              returnUrl: result.returnUrl || '',
              isLoggedIn,
            }),
          ),
        ),
      ),
    );

    this.subscribeTo(obs$, {
      next: ({ returnUrl, isLoggedIn }) => {
        this._returnUrl = returnUrl;

        if (isLoggedIn) {
          this.navService.toReturnUrl(this._returnUrl);
        }
      },
    });
  }

  private setupButtons() {
    this.model.negativeButton.isVisible = false;
    this.model.positiveButton.text = this.langService.translate(LocalizedTextIdNikisoft.LoginButton);
  }

  protected performSave(model: LoginModel, entity: LoginEntity): Observable<any> {
    return this.authService.authenticate(entity.userName, entity.password);
  }

  finishEditing(result?: NsAuthenticateResponseEntity) {
    this.authService.login(result, this._returnUrl);
  }
}
