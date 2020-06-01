import { NsApiResponseError, NsNavigationService, NsStoragePageService } from 'nikisoft-utils';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsServiceProviderComponentService } from '../../service-provider/ns-service-provider-component.service';
import { NsToolbarEditService } from '../toolbar/edit/ns-toolbar-edit.service';
import { NsPageListLayoutItemEntity } from './layout/item/ns-page-list-layout-item.entity';
import { NsPageListLoadResponse } from './ns-page-list-load.response';
import { NsPageListModel } from './ns-page-list.model';
import { NsPageListToolbarOrderModelCollection } from './toolbar/order/ns-page-list-toolbar-order-model.collection';
import { NsPageListToolbarOrderOption } from './toolbar/order/ns-page-list-toolbar-order.model';

export abstract class NsPageListService<
  TModel extends NsPageListModel<TListItemModel, TListItemEntity, TServiceProvider, TAppNavService>,
  TListItemModel extends NsPageListLayoutItemEntity,
  TListItemEntity,
  TServiceProvider extends NsServiceProvider<TAppNavService>,
  TAppNavService extends NsNavigationService
> extends NsServiceProviderComponentService<TModel, TServiceProvider, TAppNavService> implements NsToolbarEditService {
  private readonly _storagePageService: NsStoragePageService;

  protected constructor(model: TModel, serviceProvider: TServiceProvider) {
    super(model, serviceProvider);

    this._storagePageService = new NsStoragePageService(model, this.storageService);
    this.model.order = new NsPageListToolbarOrderModelCollection(this.langService);
  }

  protected get selectedItemId(): number {
    return this.model.selectedItemId;
  }

  protected get selectedItem(): TListItemModel {
    return this.model.selectedItem;
  }

  handleBackClick() {}

  onInit(): void {
    super.onInit();

    this.model.order.options = this.setupOrderOptions();

    this._storagePageService.onInit();

    this.setupPermission();

    this.subscribePageStateChanges();
  }

  private setupPermission() {
    const hasEditPermission = this.authService.hasPermission(this.model.editPermissionId);
    this.model.isAddVisible = hasEditPermission;
    this.model.isEditVisible = hasEditPermission;

    this.model.isDeleteVisible = this.authService.hasPermission(this.model.deletePermissionId);
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
        error: (error: NsApiResponseError) => this.model.resolveServerApiError(error),
      },
    );
  }

  protected abstract setupOrderOptions(): NsPageListToolbarOrderOption[];

  abstract getLoadListObservable(): Observable<NsPageListLoadResponse<TListItemEntity>>;

  abstract handleAddRequested();

  abstract handleEditRequested();

  handleDeleteRequested() {
    this.dialogService.openDeleteDialog(this.langService.getDeleteTitle(), this.langService.getDeleteMessage(), () =>
      this.performDeleteRequest(),
    );
  }

  private performDeleteRequest() {
    this.subscribeTo(this.withLoading(this.getDeleteObservable()), {
      next: () => this.model.handleDeleteReloadRequest(),
      error: (error: NsApiResponseError) => this.model.resolveServerApiError(error),
    });
  }

  protected abstract getDeleteObservable(): Observable<any>;

  onDestroy(): void {
    super.onDestroy();

    this._storagePageService.save();
    this._storagePageService.onDestroy();
  }
}
