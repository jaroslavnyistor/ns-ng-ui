import { nsIsNotNullOrEmpty } from '../../../utils/helpers/strings/ns-helpers-strings';
import { NsStoragePageModel } from '../../../utils/storage/page/ns-storage-page.model';
import { NsComponentModel } from '../../component/ns-component.model';
import { NsServiceProvider } from '../../ns-service-provider';

export abstract class NsPageDefaultModel<TServiceProvider extends NsServiceProvider>
   extends NsComponentModel
   implements NsStoragePageModel {
   private readonly _serviceProvider: TServiceProvider;
   private _hasSubtitle = false;
   private _subtitle: string;
   private _isBackVisible = false;

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

   get isBackVisible(): boolean {
      return this._isBackVisible;
   }

   set isBackVisible(value: boolean) {
      this._isBackVisible = value;
   }

   protected constructor(serviceProvider: TServiceProvider) {
      super();
      this._serviceProvider = serviceProvider;
   }

   abstract getStateKey(): string;

   getState(): any {
      return {};
   }

   setState(state: any) {
   }

   onNavigationToState(state: any) {
   }

   onNavigationBackState(state: any) {
   }


}
