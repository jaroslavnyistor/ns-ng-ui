import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NsNotFoundService } from 'nikisoft-utils';
import { NsNoPermissionService } from 'nikisoft-utils';
import { NsRouterService } from 'nikisoft-utils';
import { NsStorageService } from 'nikisoft-utils';
import { NsApiErrorResolverService } from 'nikisoft-utils';
import { LocalizationLanguagesService } from 'nikisoft-utils';
import { NsAuthenticateService } from 'nikisoft-utils';
import { NsDialogService } from '../../../../nikisoft-ng-ui/src/lib/dialog/ns-dialog.service';
import { NsMediaQueryObserver } from '../../../../nikisoft-ng-ui/src/lib/ns-media-query-observer';
import { NsServiceProvider } from '../../../../nikisoft-ng-ui/src/lib/service-provider/ns-service-provider';
import { AppNavigationService } from './app-navigation.service';

@Injectable({
  providedIn: 'root',
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
    titleService: Title,
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
      titleService,
    );
  }
}
