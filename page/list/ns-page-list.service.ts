import { Provider, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { NsApiResponseError } from '../../../utils/api/ns-api-response.error';
import { NsStoragePageService } from '../../../utils/storage/page/ns-storage-page.service';
import { NsComponentService } from '../../component/ns-component.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsToolbarEditService } from '../toolbar/edit/ns-toolbar-edit.service';
import { NsPageListLayoutItemEntity } from './layout/item/ns-page-list-layout-item.entity';
import { NsPageListLoadResponse } from './ns-page-list-load.response';
import { NsPageListModel } from './ns-page-list.model';
import { NsPageListToolbarOrderModelCollection } from './toolbar/order/ns-page-list-toolbar-order-model.collection';
import { NsPageListToolbarOrderOption } from './toolbar/order/ns-page-list-toolbar-order.model';

export function registerPageListService<TService extends NsPageListService<any, any, any, any>>(
   service: Type<TService>): Provider[] {
   return [
      service,
      {
         useExisting: service,
         provide: NsPageListService
      }
   ];
}

export abstract class NsPageListService<TModel extends NsPageListModel<TListItemModel, TListItemEntity, TServiceProvider>,
   TListItemModel extends NsPageListLayoutItemEntity,
   TListItemEntity,
   TServiceProvider extends NsServiceProvider>
   extends NsComponentService<TModel>
   implements NsToolbarEditService {
   protected readonly _serviceProvider: TServiceProvider;
   private readonly _storagePageService: NsStoragePageService;

   protected constructor(model: TModel, serviceProvider: TServiceProvider) {
      super(model);

      this._serviceProvider = serviceProvider;

      this._storagePageService = new NsStoragePageService(model, serviceProvider.storageService);
      this.model.order = new NsPageListToolbarOrderModelCollection(this._serviceProvider.langService);
   }

   protected get selectedItemId(): number {
      return this.model.selectedItemId;
   }

   protected get selectedItem(): TListItemModel {
      return this.model.selectedItem;
   }

   handleBackClick() {
   }

   onInit(): void {
      super.onInit();

      this.model.order.options = this.setupOrderOptions();

      this._storagePageService.onInit();

      this.setupPermission();

      this.subscribePageStateChanges();
   }

   private setupPermission() {
      const hasEditPermission = this._serviceProvider.authService.hasPermission(this.model.editPermissionId);
      this.model.isAddVisible = hasEditPermission;
      this.model.isEditVisible = hasEditPermission;

      this.model.isDeleteVisible = this._serviceProvider.authService.hasPermission(this.model.deletePermissionId);
   }

   private subscribePageStateChanges() {
      this.subscribeTo(
         this.pipeLoading(
            this.model.pageState$,
            tap(() => this.model.onListLoading()),
            switchMap(() => this.getLoadListObservable()),
         ),
         {
            next: (result: NsPageListLoadResponse<TListItemEntity>) => this.model.onListLoaded(result),
            error: (error: NsApiResponseError) => this.model.resolveServerApiError(error)
         }
      );
   }

   protected abstract setupOrderOptions(): NsPageListToolbarOrderOption[];

   abstract getLoadListObservable(): Observable<NsPageListLoadResponse<TListItemEntity>>;

   abstract handleAddRequested();

   abstract handleEditRequested();

   handleDeleteRequested() {
      this._serviceProvider.dialogService.openDeleteDialog(
         this._serviceProvider.langService.getDeleteTitle(),
         this._serviceProvider.langService.getDeleteMessage(),
         () => this.performDeleteRequest()
      );
   }

   private performDeleteRequest() {
      this.withLoading(this.getDeleteObservable())
      .subscribe({
         next: () => this.model.handleDeleteReloadRequest(),
         error: (error: NsApiResponseError) => this.model.resolveServerApiError(error)
      });
   }

   protected abstract getDeleteObservable(): Observable<any>;

   onDestroy(): void {
      super.onDestroy();

      this._storagePageService.save();
      this._storagePageService.onDestroy();
   }
}
