import { Params } from '@angular/router';
import { LocalizedTextIdNikisoft, NsApiResponseError, NsNavigationService, NsStoragePageService } from 'nikisoft-utils';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NsFormStepsService } from '../../form/steps/ns-form-steps.service';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsPageEditStepsModel } from './ns-page-edit-steps.model';

export abstract class NsPageEditStepsService<
  TModel extends NsPageEditStepsModel<TEntity, TServiceProvider, TAppNavService>,
  TEntity,
  TServiceProvider extends NsServiceProvider<TAppNavService>,
  TAppNavService extends NsNavigationService
> extends NsFormStepsService<TModel, TEntity, TServiceProvider, TAppNavService> {
  private readonly _storagePageService: NsStoragePageService;

  protected constructor(
    model: TModel,
    serviceProvider: TServiceProvider,
    private _entityIdObservable: Observable<Params> = null,
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
    this.subscribeTo(
      this.pipeLoading(
        this.getEntityIdObservable(),
        switchMap((id: number) => this.handleEntityIdLoaded(id)),
      ),
      this.subscribeToEntityLoaded(),
    );
  }

  private getEntityIdObservable(): Observable<number> {
    const obs$ = this._entityIdObservable || of({ id: 0 });

    return obs$.pipe(
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
      }),
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
      next: (result) => {
        this.model.loadingFinished();
        this.setEntity(result);
      },
      error: (error: NsApiResponseError) => {
        this.model.loadingFailed();
        this.model.resolveEntityLoadingError(error);
      },
    };
  }

  private setEntity(entity: TEntity) {
    if (entity == null) {
      this.model.pageErrorMessages = [this.langService.translate(LocalizedTextIdNikisoft.EditEntityNotFound)];
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
    const currentEntity = this.model.currentEntity;

    this.model.startSave(currentEntity);

    this.subscribeTo(this.withLoading(this.performSave(this.model)), {
      next: (result) => this.onSaveSuccess(result),
      error: (error: NsApiResponseError) => this.model.resolveEntityLoadingError(error),
    });
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
