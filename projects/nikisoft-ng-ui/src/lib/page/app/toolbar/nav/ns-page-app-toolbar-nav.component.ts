import { Component, Inject } from '@angular/core';
import { NsComponentBase } from '../../../../component/ns-component.base';
import { DI_NS_APP_LOGO, DI_NS_VERSION } from '../../../../ns-di.tokens';
import { NsPageAppModel } from '../../ns-page-app.model';
import { NsPageAppService } from '../../ns-page-app.service';

@Component({
  selector: 'ns-page-app-toolbar-nav',
  templateUrl: './ns-page-app-toolbar-nav.component.html',
  styleUrls: ['./ns-page-app-toolbar-nav.component.sass'],
})
export class NsPageAppToolbarNavComponent extends NsComponentBase<
  NsPageAppService<any, any, any>,
  NsPageAppModel<any, any>
> {
  constructor(
    service: NsPageAppService<any, any, any>,
    @Inject(DI_NS_APP_LOGO) public readonly logo: string,
    @Inject(DI_NS_VERSION) public readonly version: string,
  ) {
    super(service);
  }
}
