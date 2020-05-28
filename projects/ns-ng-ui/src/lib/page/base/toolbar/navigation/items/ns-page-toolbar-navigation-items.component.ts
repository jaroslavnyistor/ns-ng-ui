import { Component } from '@angular/core';
import { NsComponentBase } from '../../../../../component/ns-component.base';
import { NsPageModel } from '../../../ns-page.model';
import { NsPageService } from '../../../ns-page.service';

@Component({
  selector: 'ns-page-toolbar-navigation-items',
  templateUrl: './ns-page-toolbar-navigation-items.component.html',
  styleUrls: ['./ns-page-toolbar-navigation-items.component.sass'],
})
export class NsPageToolbarNavigationItemsComponent extends NsComponentBase<
  NsPageService<any, any, any>,
  NsPageModel<any, any>
> {
  constructor(service: NsPageService<any, any, any>) {
    super(service);
  }
}
