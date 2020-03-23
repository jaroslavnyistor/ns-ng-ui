import { PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { NsApiResponseError } from '../../../utils/api/ns-api-response.error';
import { NsServerApiErrorResolver } from '../../../utils/api/validation/server/ns-server-api-error-resolver.service';
import { NsComponentModel } from '../../component/ns-component.model';
import { NsGraphQlArgumentsBuilder } from '../../../graphql/ns-graph-ql-arguments.builder';
import { nsGraphQlQueryErrorMapper } from '../../../graphql/ns-graph-ql-query-error.mapper';
import { NsGraphQlPagingQueryResponse } from '../../../graphql/query/paging/ns-graph-ql-paging-query.response';
import { nsIsNotNullOrEmpty } from '../../../utils/helpers/strings/ns-helpers-strings';
import { NsModuleArgumentsModel } from '../../../graphql/modules/ns-module-arguments.model';
import { OrderDirection } from '../../../utils/order/order-direction';
import { NsStoragePageModel } from '../../../utils/storage/page/ns-storage-page.model';
import { LocalizationLanguagesService } from '../../../utils/localization/localization-languages.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsToolbarEditModel } from '../toolbar/edit/ns-toolbar-edit.model';
import { NsPageListLayoutItemEntity } from './layout/item/ns-page-list-layout-item.entity';
import { NsPageListState } from './ns-page-list.state';
import { NsPageListToolbarOrderModelCollection } from './toolbar/order/ns-page-list-toolbar-order-model.collection';

export abstract class NsPageListModel<TListItemModel extends NsPageListLayoutItemEntity,
   TListItemEntity,
   TServiceProvider extends NsServiceProvider>
   extends NsComponentModel
   implements NsStoragePageModel, NsModuleArgumentsModel, NsToolbarEditModel {

   private readonly _serviceProvider: TServiceProvider;
   private readonly _pageState$: BehaviorSubject<NsPageListState>;
   private readonly _items$: BehaviorSubject<TListItemModel[]>;

   private _isBackVisible = false;
   private _hasSubtitle = false;
   private _subtitle: string;
   private _pageSizeOptions = [5, 10, 25, 50, 100];
   private _order: NsPageListToolbarOrderModelCollection;
   private _totalCount = 0;
   private _selectedItem: TListItemModel;
   private _preselectedItemId: number = null;
   private _pageErrorMessages = [];
   private _isAddVisible = true;
   private _isEditVisible = true;
   private _isDeleteVisible = true;
   private _searchTooltip = '';
   private _isToolbarVisible = true;
   private _isPagingEnabled = true;
   private _isSearchVisible = true;

   protected get langService(): LocalizationLanguagesService {
      return this._serviceProvider.langService;
   }

   protected get serverApiErrorResolver(): NsServerApiErrorResolver {
      return this._serviceProvider.serverApiErrorResolver;
   }

   get pageState$(): BehaviorSubject<NsPageListState> {
      return this._pageState$;
   }

   private get pageState(): NsPageListState {
      return this._pageState$.value;
   }

   get items$(): BehaviorSubject<TListItemModel[]> {
      return this._items$;
   }

   get hasNoItems(): boolean {
      return this.items$.value.length === 0;
   }

   get isBackVisible(): boolean {
      return this._isBackVisible;
   }

   set isBackVisible(value: boolean) {
      this._isBackVisible = value;
   }

   get hasSubtitle(): boolean {
      return this._hasSubtitle;
   }

   get subtitle(): string {
      return this._subtitle;
   }

   set subtitle(value: string) {
      this._subtitle = value;
      this._hasSubtitle = nsIsNotNullOrEmpty(this._subtitle);
   }

   get pageIndex(): number {
      return this.pageState.pageIndex;
   }

   get pageSize(): number {
      return this.pageState.pageSize;
   }

   get pageSizeOptions(): number[] {
      return this._pageSizeOptions;
   }

   get order(): NsPageListToolbarOrderModelCollection {
      return this._order;
   }

   set order(value: NsPageListToolbarOrderModelCollection) {
      this._order = value;
   }

   get isNoItemSelected(): boolean {
      return this._selectedItem == null;
   }

   get isAddVisible(): boolean {
      return this._isAddVisible;
   }

   set isAddVisible(value: boolean) {
      this._isAddVisible = value;
   }

   abstract get editPermissionId(): number;

   get isEditVisible(): boolean {
      return this._isEditVisible;
   }

   set isEditVisible(value: boolean) {
      this._isEditVisible = value;
   }

   get isEditDisabled(): boolean {
      return this.isNoItemSelected;
   }

   abstract get deletePermissionId(): number;

   get isDeleteVisible(): boolean {
      return this._isDeleteVisible;
   }

   set isDeleteVisible(value: boolean) {
      this._isDeleteVisible = value;
   }

   get isDeleteDisabled(): boolean {
      return this.isNoItemSelected;
   }

   get isToolbarVisible(): boolean {
      return this._isToolbarVisible;
   }

   set isToolbarVisible(value: boolean) {
      this._isToolbarVisible = value;
   }

   get isPagingEnabled(): boolean {
      return this._isPagingEnabled;
   }

   set isPagingEnabled(value: boolean) {
      this._isPagingEnabled = value;
   }

   get totalCount(): number {
      return this._totalCount;
   }

   get selectedItemId(): number {
      return this._selectedItem == null
             ? undefined
             : this._selectedItem.id;
   }

   get selectedItem(): TListItemModel {
      return this._selectedItem;
   }

   set selectedItem(value: TListItemModel) {
      this._selectedItem = value;
   }

   get pageErrorMessages(): string[] {
      return this._pageErrorMessages;
   }

   set pageErrorMessages(value: string[]) {
      this._pageErrorMessages = value;
   }

   get searchValue(): string {
      return this.pageState.searchValue;
   }

   set searchValue(value: string) {
      this.updatePageState({
         searchValue: value
      });
   }

   get searchTooltip(): string {
      return this._searchTooltip;
   }

   set searchTooltip(value: string) {
      this._searchTooltip = value;
   }

   get isSearchVisible(): boolean {
      return this._isSearchVisible;
   }

   set isSearchVisible(value: boolean) {
      this._isSearchVisible = value;
   }

   protected constructor(
      serviceProvider: TServiceProvider,
      private readonly _apiErrorMapper: any = null
   ) {
      super();

      this._serviceProvider = serviceProvider;
      this._pageState$ = new BehaviorSubject<NsPageListState>({
         pageIndex: 0,
         pageSize: 25,
         orderBy: '',
         orderDirection: OrderDirection.Asc,
         searchValue: ''
      });

      this._items$ = new BehaviorSubject<TListItemModel[]>([]);

      if (_apiErrorMapper == null) {
         this._apiErrorMapper = nsGraphQlQueryErrorMapper;
      }
   }

   resolveServerApiError(error: NsApiResponseError) {
      this._pageErrorMessages = this.serverApiErrorResolver.resolve(
         this._apiErrorMapper,
         this.langService,
         error
      );
   }

   handleDeleteReloadRequest() {
      this._selectedItem = null;

      this.updatePageState({
         ...this.pageState
      });
   }

   handlePageChanged($event: PageEvent) {
      this.updatePageState({
         pageIndex: $event.pageIndex,
         pageSize: $event.pageSize,
      });
   }

   handleOrderChanged() {
      this.updatePageState({
         orderBy: this.order.activeItemField,
         orderDirection: this.order.activeItemDirection
      });
   }

   private updatePageState(newState: NsPageListState) {
      const updatedPageState = {
         ...this._pageState$.value,
         ...newState
      };

      this._pageState$.next(updatedPageState);
   }

   handleItemSelected(item: TListItemModel) {
      if (this._selectedItem != null) {
         this._selectedItem.isSelected = false;
      }

      if (this._selectedItem == null || item.id !== this._selectedItem.id) {
         this._selectedItem = item;
         this._selectedItem.isSelected = true;
      } else {
         this._selectedItem = null;
      }
   }

   getGraphQlArguments(builder: NsGraphQlArgumentsBuilder) {
      builder.paging(this.pageIndex, this.pageSize)
      .order(this.order.activeItemField, this.order.activeItemDirection)
      .search(this.searchValue);
   }

   onListLoading() {
      this.pageErrorMessages = [];
   }

   onListLoaded(response: NsGraphQlPagingQueryResponse<TListItemEntity>) {
      const items = response.list.map(item => this.mapToModel(item));
      this._totalCount = response.totalCount;

      const preselectedItemId = this._preselectedItemId || this.selectedItemId;
      if (preselectedItemId != null) {
         this.selectedItem = items.find(item => item.id === preselectedItemId);

         if (this.selectedItem != null) {
            this.selectedItem.isSelected = true;
         }

         this._preselectedItemId = null;
      }

      this._items$.next(items);
   }

   protected abstract mapToModel(entity: TListItemEntity): TListItemModel;

   abstract getStateKey(): string;

   getState(): any {
      return {
         pageIndex: this.pageIndex,
         pageSize: this.pageSize,
         orderId: this.order.activeItemId,
         searchValue: this.searchValue,
         selectedItemId: this.selectedItemId
      };
   }

   setState(state: any) {
      this.order.activateById(state.orderId);

      this.updatePageState({
         pageIndex: state.pageIndex,
         pageSize: state.pageSize,
         orderBy: this.order.activeItemField,
         orderDirection: this.order.activeItemDirection,
         searchValue: state.searchValue
      });

      this._preselectedItemId = state.selectedItemId;
   }

   onNavigationToState(state: any) {
   }

   onNavigationBackState(state: any) {
      if (state.id != null) {
         this._preselectedItemId = state.id;
      }
   }
}
