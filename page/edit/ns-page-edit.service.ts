import { Provider, Type } from '@angular/core';
import { Params } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NsApiResponseError } from '../../../utils/api/ns-api-response.error';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsStoragePageService } from '../../../utils/storage/page/ns-storage-page.service';
import { NsButtonDefaultModel } from '../../button/default/ns-button-default.model';
import { NsButtonRaisedModel } from '../../button/raised/ns-button-raised.model';
import { NsFormService, provideFormServiceService } from '../../form/ns-form.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsPageEditModel } from './ns-page-edit.model';

export function providePageEditService<TService extends NsPageEditService<any, any, any, any>,
   TModel extends NsPageEditModel<any, any, any>>(service: Type<TService>, model: Type<TModel>): Provider[] {
   return [
      service,
      { useExisting: service, provide: NsPageEditService },
      model,
      { useExisting: model, provide: NsPageEditModel },
      provideFormServiceService(service, model)
   ];
}

export abstract class NsPageEditService<TModel extends NsPageEditModel<TEntity, TServiceProvider, TAppNavService>,
   TEntity,
   TServiceProvider extends NsServiceProvider,
   TAppNavService extends NsNavigationService>
   extends NsFormService<TModel, TEntity, TServiceProvider, TAppNavService> {
   private readonly _storagePageService: NsStoragePageService;

   protected constructor(
      model: TModel,
      serviceProvider: TServiceProvider,
      private _entityIdObservable: Observable<Params> = null
   ) {
      super(model, serviceProvider);

      this._storagePageService = new NsStoragePageService(model, serviceProvider.storageService);

      this.model.negativeButton = new NsButtonDefaultModel(
         this.langService.getCancelText()
      );

      this.model.positiveButton = new NsButtonRaisedModel(
         this.langService.getSaveText()
      );
   }

   onInit(): void {
      super.onInit();

      this._storagePageService.onInit();

      this.prepareLoading();
   }

   private prepareLoading() {
      this.subscribeTo(
         this.pipeLoading(
            this.getEntityIdObservable(),
            switchMap(id => this.handleEntityIdLoaded(id))
         ),
         this.subscribeToEntityLoaded()
      );
   }

   private getEntityIdObservable(): Observable<number> {
      const obs$ = this._entityIdObservable || of({ id: 0 });

      return obs$
         .pipe(
            switchMap((value: Params) => {
               const id = value.id;

               if (id === undefined) {
                  this.model.loadingFinished();
                  return EMPTY;
               }

               if (id === null) {
                  return of(null);
               }

               return of(Number.parseFloat(value.id));
            })
         );
   }

   private handleEntityIdLoaded(entityId: number) {
      if (this.model.hasSavedEntity) {
         return of(this.model.savedEntity);
      }

      return this.getLoadEntityObservable(entityId);
   }

   abstract getLoadEntityObservable(entityId: number): Observable<TEntity>;

   private subscribeToEntityLoaded() {
      return {
         next: result => {
            this.model.loadingFinished();
            this.setEntity(result);
         },
         error: (error: NsApiResponseError) => {
            this.model.loadingFailed();
            this.model.resolveEntityLoadingError(error);
         }
      };
   }

   private setEntity(entity: TEntity) {
      if (entity == null) {
         this.model.pageErrorMessages = [
            this.langService.translate(
               LocalizedTextIdNikisoft.EditEntityNotFound)
         ];
      } else {
         this.model.setInitialEntity(entity);
      }
   }

   handleSaveClicked(): void {
      const isValid = this.model.validate();

      if (isValid) {
         this.save();
      }
   }

   private save() {
      this.model.startSave();

      this.subscribeTo(
         this.withLoading(this.performSave(this.model)),
         {
            next: result => this.onSaveSuccess(result),
            error: (error: NsApiResponseError) => this.model.resolveEntityLoadingError(error)
         }
      );
   }

   protected abstract performSave(model: TModel): Observable<any>;

   private onSaveSuccess(result?: any): void {
      this.finishEditing(result);
   }

   handleCancelClicked(): void {
      this.finishEditing();
   }

   abstract finishEditing(result?: any);

   onDestroy(): void {
      super.onDestroy();

      this._storagePageService.onDestroy();
   }
}
