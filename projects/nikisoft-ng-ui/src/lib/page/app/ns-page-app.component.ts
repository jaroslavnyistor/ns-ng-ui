import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NsComponentBase } from '../../component/ns-component.base';
import { NsPageAppModel } from './ns-page-app.model';
import { NsPageAppService } from './ns-page-app.service';
import { NsPageAppToolbarHeaderItemDirective } from './toolbar/ns-page-app-toolbar-header-item.directive';

@Component({
  selector: 'ns-page-app',
  templateUrl: './ns-page-app.component.html',
  styleUrls: ['./ns-page-app.component.sass'],
})
export class NsPageAppComponent extends NsComponentBase<NsPageAppService<any, any, any>, NsPageAppModel<any, any>> {
  @Input() pageTitle: string;

  @ContentChildren(NsPageAppToolbarHeaderItemDirective, { descendants: true })
  headerItems!: QueryList<NsPageAppToolbarHeaderItemDirective>;

  constructor(service: NsPageAppService<any, any, any>) {
    super(service);
  }
}
