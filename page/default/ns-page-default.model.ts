import { nsIsNotNullOrEmpty } from '../../../utils/helpers/strings/ns-helpers-strings';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsStoragePageModel } from '../../../utils/storage/page/ns-storage-page.model';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsServiceProviderComponentModel } from '../../service-provider/ns-service-provider-component.model';

export abstract class NsPageDefaultModel<TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentModel<TServiceProvider, TAppNavService>
   implements NsStoragePageModel {

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
      super(serviceProvider);
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
