import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NsAuthenticateService } from 'ns-js-utils';
import { Observable } from 'rxjs';
import { DI_NS_NOT_FOUND_AUTH_REQUIRED } from './ns-page-not-found-auth.di-tokens';

@Injectable({
  providedIn: 'root',
})
export class NsPageNotFoundAuthService implements CanActivate {
  constructor(
    private _authService: NsAuthenticateService,
    @Inject(DI_NS_NOT_FOUND_AUTH_REQUIRED) private _isAuthRequired,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._isAuthRequired ? this._authService.canActivate(route, state) : true;
  }
}
