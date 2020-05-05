import { NsApiErrorResolverService } from '../utils/api/error/ns-api-error-resolver.service';
import { NsAuthenticateService } from '../utils/authentication/ns-authenticate.service';
import { LocalizationLanguagesService } from '../utils/localization/localization-languages.service';
import { NsNavigationService } from '../utils/navigation/ns-navigation.service';
import { NsStorageService } from '../utils/storage/ns-storage.service';
import { NsComponentModel } from './component/ns-component.model';
import { NsDialogService } from './dialog/ns-dialog.service';
import { NsMediaQueryObserver } from './ns-media-query-observer';
import { NsServiceProvider } from './ns-service-provider';
import { NsPageNoPermissionService } from './page/no-permission/ns-page-no-permission.service';
import { NsPageNotFoundService } from './page/not-found/ns-page-not-found.service';

export abstract class NsServiceProviderComponentModel<TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsComponentModel {

   get langService(): LocalizationLanguagesService {
      return this._serviceProvider.langService;
   }

   protected get navService(): TAppNavService {
      return this._serviceProvider.navService as TAppNavService;
   }

   protected get apiErrorResolverService(): NsApiErrorResolverService {
      return this._serviceProvider.apiErrorResolverService;
   }

   protected get authService(): NsAuthenticateService {
      return this._serviceProvider.authService;
   }

   protected get dialogService(): NsDialogService {
      return this._serviceProvider.dialogService;
   }

   protected get storageService(): NsStorageService {
      return this._serviceProvider.storageService;
   }

   protected get noPermissionService(): NsPageNoPermissionService {
      return this._serviceProvider.noPermissionService;
   }

   protected get notFoundService(): NsPageNotFoundService {
      return this._serviceProvider.notFoundService;
   }

   protected get mediaQueryObserver(): NsMediaQueryObserver {
      return this._serviceProvider.mediaQueryObserver;
   }

   protected constructor(private readonly _serviceProvider: TServiceProvider) {
      super();
   }
}
