import { Component, Inject, Input, QueryList } from '@angular/core';
import { NsComponentBase } from '../../../component/ns-component.base';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { DI_NS_VERSION } from '../../../ns-di.tokens';
import { NsPageAppModel } from '../ns-page-app.model';
import { NsPageAppService } from '../ns-page-app.service';
import { NsPageAppToolbarHeaderItemDirective } from './ns-page-app-toolbar-header-item.directive';

@Component({
  selector: 'ns-page-app-toolbar',
  templateUrl: './ns-page-app-toolbar.component.html',
  styleUrls: ['./ns-page-app-toolbar.component.sass'],
})
export class NsPageAppToolbarComponent extends NsComponentBase<NsPageAppService<any, any, any>, NsPageAppModel<any, any>> {
  readonly menuIcon = NsIcon.Navigation_Menu;
  @Input() headerItems!: QueryList<NsPageAppToolbarHeaderItemDirective>;

  constructor(service: NsPageAppService<any, any, any>, @Inject(DI_NS_VERSION) public readonly version: string) {
    super(service);
  }
}
