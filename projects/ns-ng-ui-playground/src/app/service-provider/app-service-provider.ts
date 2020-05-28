import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NsRouterService } from 'ns-js-utils';
import { NsStorageService } from 'ns-js-utils';
import { NsApiErrorResolverService } from 'ns-js-utils';
import { LocalizationLanguagesService } from 'ns-js-utils';
import { NsAuthenticateService } from 'ns-js-utils';
import { NsMediaQueryObserver } from 'ns-ng-ui';
import { NsPageNotFoundService } from 'ns-ng-ui';
import { NsPageNoPermissionService } from 'ns-ng-ui';
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
    noPermissionService: NsPageNoPermissionService,
    notFoundService: NsPageNotFoundService,
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
