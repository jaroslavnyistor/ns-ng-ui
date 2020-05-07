import { Provider, Type } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NsApiErrorResolverService } from '../utils/api/error/ns-api-error-resolver.service';
import { NsAuthenticateService } from '../utils/authentication/ns-authenticate.service';
import { LocalizationLanguagesService } from '../utils/localization/localization-languages.service';
import { NsNavigationService } from '../utils/navigation/ns-navigation.service';
import { NsRouterService } from '../utils/navigation/ns-router.service';
import { NsStorageService } from '../utils/storage/ns-storage.service';
import { NsDialogService } from './dialog/ns-dialog.service';
import { NsMediaQueryObserver } from './ns-media-query-observer';
import { NsPageNoPermissionService } from './page/no-permission/ns-page-no-permission.service';
import { NsPageNotFoundService } from './page/not-found/ns-page-not-found.service';

export function provideServiceProvider<TServiceProvider extends NsServiceProvider, TNavService extends NsNavigationService>(
   serviceProvider: Type<TServiceProvider>, navService: Type<TNavService>): Provider[] {
   return [
      serviceProvider,
      {
         useExisting: serviceProvider,
         provide: NsServiceProvider
      },
      navService,
      {
         useExisting: navService,
         provide: NsNavigationService
      }
   ];
}

export abstract class NsServiceProvider {
   get langService(): LocalizationLanguagesService {
      return this._langService;
   }

   get navService(): NsNavigationService {
      return this._navService;
   }

   get apiErrorResolverService(): NsApiErrorResolverService {
      return this._apiErrorResolverService;
   }

   get authService(): NsAuthenticateService {
      return this._authService;
   }

   get dialogService(): NsDialogService {
      return this._dialogService;
   }

   get storageService(): NsStorageService {
      return this._storageService;
   }

   get noPermissionService(): NsPageNoPermissionService {
      return this._noPermissionService;
   }

   get notFoundService(): NsPageNotFoundService {
      return this._notFoundService;
   }

   get mediaQueryObserver(): NsMediaQueryObserver {
      return this._mediaQueryObserver;
   }

   get routerService(): NsRouterService {
      return this._routerService;
   }

   get titleService(): Title {
      return this._titleService;
   }

   protected constructor(
      private readonly _langService: LocalizationLanguagesService,
      private readonly _navService: NsNavigationService,
      private readonly _apiErrorResolverService: NsApiErrorResolverService,
      private readonly _authService: NsAuthenticateService,
      private readonly _dialogService: NsDialogService,
      private readonly _storageService: NsStorageService,
      private readonly _noPermissionService: NsPageNoPermissionService,
      private readonly _notFoundService: NsPageNotFoundService,
      private readonly _mediaQueryObserver: NsMediaQueryObserver,
      private readonly _routerService: NsRouterService,
      private readonly _titleService: Title
   ) {
   }
}
