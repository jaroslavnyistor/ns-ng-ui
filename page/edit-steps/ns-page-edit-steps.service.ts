import { Provider, Type } from '@angular/core';
import { Params } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NsFormStepsService, registerPageFormStepsService } from '../../form/steps/ns-form-steps.service';
import { NsApiResponseError } from '../../../utils/api/ns-api-response.error';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsStoragePageService } from '../../../utils/storage/page/ns-storage-page.service';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsPageEditStepsModel } from './ns-page-edit-steps.model';

export function registerPageEditStepsService<TService extends NsPageEditStepsService<any, any, any>>(
   service: Type<TService>): Provider[] {
   return [
      service,
      {
         useExisting: service,
         provide: NsPageEditStepsService
      },
      registerPageFormStepsService(service)
   ];
}

export abstract class NsPageEditStepsService<TModel extends NsPageEditStepsModel<TEntity, TServiceProvider>,
   TEntity,
   TServiceProvider extends NsServiceProvider>
   extends NsFormStepsService<TModel, TEntity, TServiceProvider> {
   private readonly _storagePageService: NsStoragePageService;

   protected get navService(): NsNavigationService {
      return this._serviceProvider.navService;
   }

   protected constructor(
      model: TModel,
      serviceProvider: TServiceProvider,
      private _entityIdObservable: Observable<Params> = null
   ) {
      super(model, serviceProvider);

      this._storagePageService = new NsStoragePageService(model, serviceProvider.storageService);
   }

   onInit(): void {
      super.onInit();

      this._storagePageService.onInit();

      this.prepareLoading();
   }

   private prepareLoading() {
      this.pipeLoading(
         this.getEntityIdObservable()
      )
      .pipe(
         switchMap(id => this.handleEntityIdLoaded(id))
      )
      .subscribe(this.subscribeToEntityLoaded());
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
            this._serviceProvider.langService.text(LocalizedTextIdNikisoft.EditEntityNotFound)
         ];
      } else {
         this.model.setInitialEntity(entity);
      }
   }

   checkKeyPress($event: KeyboardEvent) {
      if ($event.key === 'Enter') {
         $event.preventDefault();
         $event.stopPropagation();

         this.handleSaveClicked();
      } else if ($event.key === 'Escape') {
         $event.preventDefault();
         $event.stopPropagation();

         this.handleCancelClicked();
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

      this.addSubscription(
         this.withLoading(this.performSave(this.model))
         .subscribe({
            next: result => this.onSaveSuccess(result),
            error: (error: NsApiResponseError) => this.model.resolveEntityLoadingError(error)
         })
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
