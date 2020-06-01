import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NsNotFoundService } from 'ns-js-utils';
import { NsNoPermissionService } from 'ns-js-utils';
import { NsRouterService } from 'ns-js-utils';
import { NsStorageService } from 'ns-js-utils';
import { NsApiErrorResolverService } from 'ns-js-utils';
import { LocalizationLanguagesService } from 'ns-js-utils';
import { NsAuthenticateService } from 'ns-js-utils';
import { NsMediaQueryObserver } from 'ns-ng-ui';
import { NsDialogService } from 'ns-ng-ui';
import { NsServiceProvider } from 'ns-ng-ui';
import { AppNavigationService } from './app-navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AppServiceProvider extends NsServiceProvider<AppNavigationService> {
  constructor(
    langService: LocalizationLanguagesService,
    navService: AppNavigationService,
    apiErrorResolverService: NsApiErrorResolverService,
    authService: NsAuthenticateService,
    dialogService: NsDialogService,
    storageService: NsStorageService,
    noPermissionService: NsNoPermissionService,
    notFoundService: NsNotFoundService,
    mediaQueryObserver: NsMediaQueryObserver,
    routerService: NsRouterService,
    titleService: Title
  ) {
    super(
      langService,
      navService,
      apiErrorResolverService,
      authService,
      dialogService,
      storageService,
      noPermissionService,
      notFoundService,
      mediaQueryObserver,
      routerService,
      titleService
    );
  }
}
