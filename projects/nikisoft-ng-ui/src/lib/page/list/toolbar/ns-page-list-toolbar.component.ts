import { Component, Input, QueryList } from '@angular/core';
import { NsPageListModel } from '../ns-page-list.model';
import { NsPageListService } from '../ns-page-list.service';
import { NsPageListToolbarItemDirective } from './ns-page-list-toolbar-item.directive';

@Component({
  selector: 'ns-page-list-toolbar',
  templateUrl: './ns-page-list-toolbar.component.html',
  styleUrls: ['./ns-page-list-toolbar.component.sass'],
})
export class NsPageListToolbarComponent {
  @Input() model: NsPageListModel<any, any, any, any>;
  @Input() service: NsPageListService<any, any, any, any, any>;
  @Input() toolBarItems = new QueryList<NsPageListToolbarItemDirective>();
}
