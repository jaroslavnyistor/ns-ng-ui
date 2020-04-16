import { NsModuleMutationModel } from '../../../graphql/modules/ns-module-mutation.model';
import { NsApiResponseError } from '../../../utils/api/ns-api-response.error';
import { NsServerApiErrorResolver } from '../../../utils/api/validation/server/ns-server-api-error-resolver.service';
import { nsIsNotNullOrEmpty } from '../../../utils/helpers/strings/ns-helpers-strings';
import { NsStoragePageModel } from '../../../utils/storage/page/ns-storage-page.model';
import { NsButtonDefaultModel } from '../../button/default/ns-button-default.model';
import { NsButtonRaisedModel } from '../../button/raised/ns-button-raised.model';
import { NsFormModel } from '../../form/ns-form.model';
import { NsServiceProvider } from '../../ns-service-provider';

const keyStateEntity = 'entity';

export abstract class NsPageEditModel<TEntity, TServiceProvider extends NsServiceProvider>
   extends NsFormModel<TEntity, TServiceProvider>
   implements NsStoragePageModel, NsModuleMutationModel {

   private _hasSubtitle = false;
   private _subtitle: string;
   private _negativeButton: NsButtonDefaultModel;
   private _positiveButton: NsButtonRaisedModel;
   private _pageErrorMessages = [];
   private _savedEntity: TEntity;
   private _entityToSave: TEntity;

   private get serverApiErrorResolver(): NsServerApiErrorResolver {
      return this.configuration.serverApiErrorResolver;
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

   get entityToSave(): TEntity {
      return this._entityToSave;
   }

   protected constructor(
      entity: TEntity,
      private _serverApiErrorMapper: any,
      serviceProvider: TServiceProvider
   ) {
      super(entity, serviceProvider);

      this.negativeButton = new NsButtonDefaultModel('');
      this.positiveButton = new NsButtonRaisedModel('');
   }

   resolveEntityLoadingError(error: NsApiResponseError) {
      this.pageErrorMessages = this.serverApiErrorResolver.resolve(
         this._serverApiErrorMapper,
         this.langService,
         error
      );
   }

   validate(): boolean {
      this.formGroup.markAllAsTouched();
      this.formGroup.updateValueAndValidity();
      return this.isFormValid;
   }

   startSave() {
      this._entityToSave = this.clonedCurrentEntity;

      this.onBeforeEntitySaved(this.initialEntity, this._entityToSave);
   }

   protected onBeforeEntitySaved(initialEntity: TEntity, entityToSave: TEntity) {
   }

   abstract getStateKey(): string;

   getState(): any {
      return {
         [keyStateEntity]: this.clonedCurrentEntity
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
