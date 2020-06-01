import { Component, Input } from '@angular/core';
import { nsIsNotNullOrEmpty } from 'nikisoft-utils';
import { NsIcon } from '../../../../icon/ns-icon.enum';
import { NsPageListModel } from '../../ns-page-list.model';
import { NsPageListService } from '../../ns-page-list.service';
import { NsPageListLayoutDefaultItemModel } from './ns-page-list-layout-default-item.model';

@Component({
  selector: 'ns-page-list-layout-item-default',
  templateUrl: './ns-page-list-layout-default.component.html',
  styleUrls: ['./ns-page-list-layout-default.component.sass'],
})
export class NsPageListLayoutDefaultComponent {
  @Input() xl = 50;
  @Input() lg = 50;
  @Input() md = 50;
  @Input() sm = 50;
  @Input() xs = 100;

  @Input() model: NsPageListModel<NsPageListLayoutDefaultItemModel, any, any, any>;
  @Input() service: NsPageListService<any, any, any, any, any>;
  @Input() noItemsMessage: string;

  NsIcon = NsIcon;

  get hasNoItemsMessage(): boolean {
    return nsIsNotNullOrEmpty(this.noItemsMessage);
  }
}
