import { nsApiErrorMapper } from '../../../utils/api/error/ns-api-error.mapper';
import { NsApiResponseError } from '../../../utils/api/ns-api-response.error';
import { nsIsNotNullOrEmpty } from '../../../utils/helpers/strings/ns-helpers-strings';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsStoragePageModel } from '../../../utils/storage/page/ns-storage-page.model';
import { NsFormStepsModel } from '../../form/steps/ns-form-steps.model';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';

const keyStateEntity = 'entity';

export abstract class NsPageEditStepsModel<TEntity,
   TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService>
   extends NsFormStepsModel<TEntity, TServiceProvider, TAppNavService>
   implements NsStoragePageModel {
   private _hasSubtitle = false;
   private _subtitle: string;
   private _pageErrorMessages = [];
   private _savedEntity: TEntity;
   private _entityToSave: TEntity;

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

   get pageErrorMessages(): any[] {
      return this._pageErrorMessages;
   }

   set pageErrorMessages(value: any[]) {
      this._pageErrorMessages = value;
   }

   get hasSavedEntity(): boolean {
      return this._savedEntity != null;
   }

   get savedEntity(): TEntity {
      return this._savedEntity;
   }

   get entityToSave(): TEntity {
      return this._entityToSave;
   }

   protected constructor(
      serviceProvider: TServiceProvider,
      entity: TEntity,
      private readonly _apiErrorMapper: any = nsApiErrorMapper,
   ) {
      super(serviceProvider, entity);
   }

   resolveEntityLoadingError(error: NsApiResponseError) {
      this._pageErrorMessages = this.apiErrorResolverService.resolve(
         this._apiErrorMapper,
         error
      );
   }

   startSave(currentEntity: TEntity) {
      this.onBeforeEntitySaved(this.initialEntity, currentEntity);
   }

   protected onBeforeEntitySaved(initialEntity: TEntity, currentEntity: TEntity) {
   }

   abstract getStateKey(): string;

   getState(): any {
      return {
         [keyStateEntity]: this.currentEntity
      };
   }

   setState(state: any) {
      this._savedEntity = state[keyStateEntity];
   }

   onNavigationToState(state: any) {
   }

   onNavigationBackState(state: any) {
   }
}
