import { Component, ContentChild, ContentChildren, Input, QueryList } from '@angular/core';
import { nsIsNotNullOrEmpty } from 'nikisoft-utils';
import { NsComponentBase } from '../../component/ns-component.base';
import { NsIcon } from '../../icon/ns-icon.enum';
import { NsPageListLayoutCustomDirective } from './layout/custom/ns-page-list-layout-custom.directive';
import { NsPageListModel } from './ns-page-list.model';
import { NsPageListService } from './ns-page-list.service';
import { NsPageListToolbarItemDirective } from './toolbar/ns-page-list-toolbar-item.directive';

@Component({
  selector: 'ns-page-list',
  templateUrl: './ns-page-list.component.html',
  styleUrls: ['./ns-page-list.component.sass'],
})
export class NsPageListComponent extends NsComponentBase<
  NsPageListService<any, any, any, any, any>,
  NsPageListModel<any, any, any, any>
> {
  @Input() pageTitle: string;

  @Input() xl = 50;
  @Input() lg = 60;
  @Input() md = 80;
  @Input() sm = 100;
  @Input() xs = 100;
  @Input() noItemsMessage: string;

  @ContentChildren(NsPageListToolbarItemDirective) toolbarItems = new QueryList<NsPageListToolbarItemDirective>();

  @ContentChild(NsPageListLayoutCustomDirective, { static: true })
  listLayoutItemTemplate: NsPageListLayoutCustomDirective;

  get hasPageTitle(): boolean {
    return nsIsNotNullOrEmpty(this.pageTitle);
  }

  get hasListLayoutItemTemplate(): boolean {
    return this.listLayoutItemTemplate != null;
  }

  get model(): NsPageListModel<any, any, any, any> {
    return this.service.model;
  }

  get arrowBackIcon(): NsIcon {
    return NsIcon.Navigation_ArrowBack;
  }

  constructor(service: NsPageListService<any, any, any, any, any>) {
    super(service);
  }
}
