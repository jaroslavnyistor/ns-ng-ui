import {
   nsApiErrorMapper,
   NsApiResponseError,
   nsIsNotNullOrEmpty,
   NsNavigationService,
   NsStoragePageModel
} from 'ns-js-utils';
import { NsButtonDefaultModel } from '../../button/default/ns-button-default.model';
import { NsButtonRaisedModel } from '../../button/raised/ns-button-raised.model';
import { NsFormModel } from '../../form/ns-form.model';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';

const keyStateEntity = 'entity';

export abstract class NsPageEditModel<TEntity,
   TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService>
   extends NsFormModel<TEntity, TServiceProvider, TAppNavService>
   implements NsStoragePageModel {

   private _hasSubtitle = false;
   private _subtitle: string;
   private _negativeButton: NsButtonDefaultModel;
   private _positiveButton: NsButtonRaisedModel;
   private _pageErrorMessages = [];
   private _savedEntity: TEntity;

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

   get negativeButton(): NsButtonDefaultModel {
      return this._negativeButton;
   }

   set negativeButton(value: NsButtonDefaultModel) {
      this._negativeButton = value;
   }

   get positiveButton(): NsButtonRaisedModel {
      return this._positiveButton;
   }

   set positiveButton(value: NsButtonRaisedModel) {
      this._positiveButton = value;
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

   protected constructor(
      serviceProvider: TServiceProvider,
      entity: TEntity,
      private readonly _apiErrorMapper: any = nsApiErrorMapper,
   ) {
      super(serviceProvider, entity);

      this.negativeButton = new NsButtonDefaultModel('');
      this.positiveButton = new NsButtonRaisedModel('');
   }

   resolveEntityLoadingError(error: NsApiResponseError) {
      this.pageErrorMessages = this.apiErrorResolverService.resolve(
         this._apiErrorMapper,
         error
      );
   }

   startSave(currentEntity: TEntity) {
      this.onBeforeEntitySaved(this.initialEntity, currentEntity);
   }

   protected onBeforeEntitySaved(initialEntity: TEntity, entityToSave: TEntity) {
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
