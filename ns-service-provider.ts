import { Injectable } from '@angular/core';
import { NsApiErrorResolverService } from '../utils/api/error/ns-api-error-resolver.service';
import { NsAuthenticateService } from '../utils/authentication/ns-authenticate.service';
import { LocalizationLanguagesService } from '../utils/localization/localization-languages.service';
import { NsNavigationService } from '../utils/navigation/ns-navigation.service';
import { NsStorageService } from '../utils/storage/ns-storage.service';
import { NsDialogService } from './dialog/ns-dialog.service';
import { NsPageNoPermissionService } from './page/no-permission/ns-page-no-permission.service';
import { NsPageNotFoundService } from './page/not-found/ns-page-not-found.service';

@Injectable({
   providedIn: 'root'
})
export class NsServiceProvider {
   private readonly _langService: LocalizationLanguagesService;
   private readonly _navService: NsNavigationService;
   private readonly _serverApiErrorResolver: NsApiErrorResolverService;
   private readonly _authService: NsAuthenticateService;
   private readonly _dialogService: NsDialogService;
   private readonly _storageService: NsStorageService;
   private readonly _noPermissionService: NsPageNoPermissionService;
   private readonly _notFoundService: NsPageNotFoundService;

   get langService(): LocalizationLanguagesService {
      return this._langService;
   }

   get navService(): NsNavigationService {
      return this._navService;
   }

   get serverApiErrorResolver(): NsApiErrorResolverService {
      return this._serverApiErrorResolver;
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

   constructor(
      langService: LocalizationLanguagesService,
      navService: NsNavigationService,
      serverApiErrorResolver: NsApiErrorResolverService,
      authService: NsAuthenticateService,
      dialogService: NsDialogService,
      storageService: NsStorageService,
      noPermissionService: NsPageNoPermissionService,
      notFoundService: NsPageNotFoundService,
   ) {
      this._langService = langService;
      this._navService = navService;
      this._serverApiErrorResolver = serverApiErrorResolver;
      this._authService = authService;
      this._dialogService = dialogService;
      this._storageService = storageService;
      this._noPermissionService = noPermissionService;
      this._notFoundService = notFoundService;
   }
}
