import { Title } from '@angular/platform-browser';
import { NsApiErrorResolverService } from '../../utils/api/error/ns-api-error-resolver.service';
import { NsAuthenticateService } from '../../utils/authentication/ns-authenticate.service';
import { LocalizationLanguagesService } from '../../utils/localization/localization-languages.service';
import { NsNavigationService } from '../../utils/navigation/ns-navigation.service';
import { NsRouterService } from '../../utils/navigation/ns-router.service';
import { NsStorageService } from '../../utils/storage/ns-storage.service';
import { NsComponentService } from '../component/ns-component.service';
import { NsDialogService } from '../dialog/ns-dialog.service';
import { NsMediaQueryObserver } from '../ns-media-query-observer';
import { NsServiceProvider } from './ns-service-provider';
import { NsServiceProviderComponentModel } from './ns-service-provider-component.model';
import { NsPageNoPermissionService } from '../page/no-permission/ns-page-no-permission.service';
import { NsPageNotFoundService } from '../page/not-found/ns-page-not-found.service';

export abstract class NsServiceProviderComponentService<TModel extends NsServiceProviderComponentModel<TServiceProvider, TAppNavService>,
   TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService>
   extends NsComponentService<TModel> {

   protected get langService(): LocalizationLanguagesService {
      return this._serviceProvider.langService;
   }

   protected get navService(): TAppNavService {
      return this._serviceProvider.navService;
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

   protected get routerService(): NsRouterService {
      return this._serviceProvider.routerService;
   }

   protected get titleService(): Title {
      return this._serviceProvider.titleService;
   }

   protected constructor(
      model: TModel,
      private readonly _serviceProvider: TServiceProvider) {
      super(model);
   }
}
