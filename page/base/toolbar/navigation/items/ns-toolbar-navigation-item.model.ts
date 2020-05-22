import { LocalizationLanguagesService } from '../../../../../../utils/localization/localization-languages.service';
import { NsNavigationService } from '../../../../../../utils/navigation/ns-navigation.service';
import { NsIcon } from '../../../../../icon/ns-icon.enum';
import { NsToolbarNavigationItemEntity } from './ns-toolbar-navigation-item.entity';

export class NsToolbarNavigationItemModel {
   private readonly _title: string;
   private readonly _subtitle: string;
   private readonly _hasSubtitle: boolean;
   private readonly _iconStyle: any;

   get title(): string {
      return this._title;
   }

   get subtitle(): string {
      return this._subtitle;
   }

   get hasSubtitle(): boolean {
      return this._hasSubtitle;
   }

   get icon(): NsIcon {
      return this._entity.icon;
   }

   get iconStyle(): any {
      return this._iconStyle;
   }

   constructor(
      private readonly _entity: NsToolbarNavigationItemEntity,
      langService: LocalizationLanguagesService
   ) {
      this._title = langService.translate(this._entity.titleId);

      this._hasSubtitle = this._entity.subtitleId != null;
      this._subtitle = this._hasSubtitle
                       ? langService.translate(this._entity.subtitleId)
                       : '';

      this._iconStyle = { visibility: this._entity.icon ? 'visible' : 'hidden' }
   }

   handleItemClicked(navService: NsNavigationService) {
      if (this._entity.route != null) {
         navService.toUrl(this._entity.route);
      }

      if (this._entity.action != null) {
         this._entity.action();
      }
   }
}
