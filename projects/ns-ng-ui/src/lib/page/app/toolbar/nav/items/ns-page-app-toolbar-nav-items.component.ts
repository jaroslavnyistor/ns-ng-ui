import { Component } from '@angular/core';
import { NsComponentBase } from '../../../../../component/ns-component.base';
import { NsPageAppModel } from '../../../ns-page-app.model';
import { NsPageAppService } from '../../../ns-page-app.service';

@Component({
  selector: 'ns-page-app-toolbar-nav-items',
  templateUrl: './ns-page-app-toolbar-nav-items.component.html',
  styleUrls: ['./ns-page-app-toolbar-nav-items.component.sass'],
})
export class NsPageAppToolbarNavItemsComponent extends NsComponentBase<
  NsPageAppService<any, any, any>,
  NsPageAppModel<any, any>
> {
  constructor(service: NsPageAppService<any, any, any>) {
    super(service);
  }
}
