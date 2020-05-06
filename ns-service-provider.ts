import { Provider, Type } from '@angular/core';
import { NsApiErrorResolverService } from '../utils/api/error/ns-api-error-resolver.service';
import { NsAuthenticateService } from '../utils/authentication/ns-authenticate.service';
import { LocalizationLanguagesService } from '../utils/localization/localization-languages.service';
import { NsNavigationService } from '../utils/navigation/ns-navigation.service';
import { NsStorageService } from '../utils/storage/ns-storage.service';
import { NsDialogService } from './dialog/ns-dialog.service';
import { NsMediaQueryObserver } from './ns-media-query-observer';
import { NsPageNoPermissionService } from './page/no-permission/ns-page-no-permission.service';
import { NsPageNotFoundService } from './page/not-found/ns-page-not-found.service';

export function registerServiceProvider<TService extends NsServiceProvider>(
   service: Type<TService>): Provider[] {
   return [
      service,
      {
         useExisting: service,
         provide: NsServiceProvider
      }
   ];
}

export abstract class NsServiceProvider {
   private readonly _langService: LocalizationLanguagesService;
   private readonly _navService: NsNavigationService;
   private readonly _apiErrorResolverService: NsApiErrorResolverService;
   private readonly _authService: NsAuthenticateService;
   private readonly _dialogService: NsDialogService;
   private readonly _storageService: NsStorageService;
   private readonly _noPermissionService: NsPageNoPermissionService;
   private readonly _notFoundService: NsPageNotFoundService;
   private readonly _mediaQueryObserver: NsMediaQueryObserver;

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

   protected constructor(
      langService: LocalizationLanguagesService,
      navService: NsNavigationService,
      apiErrorResolverService: NsApiErrorResolverService,
      authService: NsAuthenticateService,
      dialogService: NsDialogService,
      storageService: NsStorageService,
      noPermissionService: NsPageNoPermissionService,
      notFoundService: NsPageNotFoundService,
      mediaQueryObserver: NsMediaQueryObserver,
   ) {
      this._langService = langService;
      this._navService = navService;
      this._apiErrorResolverService = apiErrorResolverService;
      this._authService = authService;
      this._dialogService = dialogService;
      this._storageService = storageService;
      this._noPermissionService = noPermissionService;
      this._notFoundService = notFoundService;
      this._mediaQueryObserver = mediaQueryObserver;
   }
}
