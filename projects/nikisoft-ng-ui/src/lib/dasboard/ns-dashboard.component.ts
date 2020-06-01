import { Component, Input } from '@angular/core';
import { NsComponentBase } from '../component/ns-component.base';
import { NsDashboardModel } from './ns-dashboard.model';
import { NsDashboardService } from './ns-dashboard.service';

@Component({
  selector: 'ns-dashboard',
  templateUrl: './ns-dashboard.component.html',
  styleUrls: ['./ns-dashboard.component.sass'],
})
export class NsDashboardComponent extends NsComponentBase<
  NsDashboardService<NsDashboardModel<any, any>, any, any>,
  NsDashboardModel<any, any>
> {
  @Input() xl = 50;
  @Input() lg = 50;
  @Input() md = 50;
  @Input() sm = 100;
  @Input() xs = 100;

  @Input() xlItem = 33;
  @Input() lgItem = 50;
  @Input() mdItem = 50;
  @Input() smItem = 50;
  @Input() xsItem = 100;

  constructor(service: NsDashboardService<NsDashboardModel<any, any>, any, any>) {
    super(service);
  }
}
