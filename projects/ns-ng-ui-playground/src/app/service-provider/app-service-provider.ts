import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NsDialogService } from 'ns-ng-ui/lib/dialog/ns-dialog.service';
import { NsMediaQueryObserver } from 'ns-ng-ui/lib/ns-media-query-observer';
import { NsPageNoPermissionService } from 'ns-ng-ui/lib/page/no-permission/ns-page-no-permission.service';
import { NsPageNotFoundService } from 'ns-ng-ui/lib/page/not-found/ns-page-not-found.service';
import { NsServiceProvider } from 'ns-ng-ui/lib/service-provider/ns-service-provider';
import { AppNavigationService } from './app-navigation.service';
import { LocalizationLanguagesService } from 'ns-js-utils/lib/localization/localization-languages.service';
import { NsApiErrorResolverService } from 'ns-js-utils/lib/api/error/ns-api-error-resolver.service';
import { NsAuthenticateService } from 'ns-js-utils/lib/authentication/ns-authenticate.service';
import { NsStorageService } from 'ns-js-utils/lib/storage/ns-storage.service';
import { NsRouterService } from 'ns-js-utils/lib/navigation/ns-router.service';

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
