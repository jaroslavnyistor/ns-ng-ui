import { Component, Inject } from '@angular/core';
import { NsComponentBase } from '../../../../component/ns-component.base';
import { DI_NS_APP_LOGO, DI_NS_VERSION } from '../../../../ns-di.tokens';
import { NsPageModel } from '../../ns-page.model';
import { NsPageService } from '../../ns-page.service';

@Component({
  selector: 'ns-page-toolbar-navigation',
  templateUrl: './ns-page-toolbar-navigation.component.html',
  styleUrls: ['./ns-page-toolbar-navigation.component.sass'],
})
export class NsPageToolbarNavigationComponent extends NsComponentBase<
  NsPageService<any, any, any>,
  NsPageModel<any, any>
> {
  constructor(
    service: NsPageService<any, any, any>,
    @Inject(DI_NS_APP_LOGO) public readonly logo: string,
    @Inject(DI_NS_VERSION) public readonly version: string,
  ) {
    super(service);
  }
}
