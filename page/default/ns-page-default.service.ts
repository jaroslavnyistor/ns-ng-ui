import { Provider, Type } from '@angular/core';
import { NsStoragePageService } from '../../../utils/storage/page/ns-storage-page.service';
import { NsComponentService } from '../../component/ns-component.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsPageDefaultModel } from './ns-page-default.model';

export function registerPageDefaultService<TService extends NsPageDefaultService<any, any>>(service: Type<TService>):
   Provider[] {
   return [
      service,
      {
         useExisting: service,
         provide: NsPageDefaultService
      }
   ];
}

export abstract class NsPageDefaultService<TModel extends NsPageDefaultModel<TServiceProvider>,
   TServiceProvider extends NsServiceProvider>
   extends NsComponentService<TModel> {
   protected readonly _serviceProvider: TServiceProvider;
   private readonly _storagePageService: NsStoragePageService;

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model);
      this._serviceProvider = serviceProvider;

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
