import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsStoragePageService } from '../../../utils/storage/page/ns-storage-page.service';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsServiceProviderComponentService } from '../../service-provider/ns-service-provider-component.service';
import { NsPageDefaultModel } from './ns-page-default.model';

export abstract class NsPageDefaultService<TModel extends NsPageDefaultModel<TServiceProvider, TAppNavService>,
   TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentService<TModel, TServiceProvider, TAppNavService> {
   private readonly _storagePageService: NsStoragePageService;

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model, serviceProvider);

      this._storagePageService = new NsStoragePageService(model, serviceProvider.storageService);
   }

   onInit(): void {
      super.onInit();

      this._storagePageService.onInit();
   }

   handleBackClick() {
   }

   onDestroy(): void {
      super.onDestroy();

      this._storagePageService.save();
      this._storagePageService.onDestroy();
   }
}
