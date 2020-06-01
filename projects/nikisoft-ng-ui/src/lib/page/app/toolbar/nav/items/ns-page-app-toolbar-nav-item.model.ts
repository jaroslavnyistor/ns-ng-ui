import { LocalizationLanguagesService } from 'nikisoft-utils';
import { NsIcon } from '../../../../../icon/ns-icon.enum';
import { NsPageAppToolbarNavItemEntity } from './ns-page-app-toolbar-nav-item.entity';

export class NsPageAppToolbarNavItemModel {
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

  constructor(private readonly _entity: NsPageAppToolbarNavItemEntity, langService: LocalizationLanguagesService) {
    if (_entity.title != null) {
      this._title = this._entity.title;
    } else if (this._entity.titleId != null) {
      this._title = langService.translate(this._entity.titleId);
    }

    this._hasSubtitle = this._entity.subtitleId != null;
    this._subtitle = this._hasSubtitle ? langService.translate(this._entity.subtitleId) : '';

    this._iconStyle = { visibility: this._entity.icon ? 'visible' : 'hidden' };
  }

  handleItemClicked() {
    this._entity.action();
  }
}
