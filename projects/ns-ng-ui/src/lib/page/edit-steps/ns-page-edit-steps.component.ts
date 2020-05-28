import { Component, Input } from '@angular/core';
import { NsComponentBase } from '../../component/ns-component.base';
import { NsPageEditStepsModel } from './ns-page-edit-steps.model';
import { NsPageEditStepsService } from './ns-page-edit-steps.service';

@Component({
  selector: 'ns-page-edit-steps',
  templateUrl: './ns-page-edit-steps.component.html',
  styleUrls: ['./ns-page-edit-steps.component.sass'],
})
export class NsPageEditStepsComponent extends NsComponentBase<
  NsPageEditStepsService<any, any, any, any>,
  NsPageEditStepsModel<any, any, any>
> {
  @Input() pageTitle: string;

  @Input() xl = 30;
  @Input() lg = 35;
  @Input() md = 60;
  @Input() sm = 100;
  @Input() xs = 100;

  constructor(service: NsPageEditStepsService<any, any, any, any>) {
    super(service);
  }
}
