import { Component } from '@angular/core';
import { NsComponentBase } from '../../component/ns-component.base';
import { NsIcon } from '../../icon/ns-icon.enum';
import { NsFormStepsModel } from './ns-form-steps.model';
import { NsFormStepsService } from './ns-form-steps.service';

@Component({
  selector: 'ns-form-steps-buttons',
  templateUrl: './ns-form-steps-buttons.component.html',
  styleUrls: ['./ns-form-steps-buttons.component.sass'],
})
export class NsFormStepsButtonsComponent extends NsComponentBase<
  NsFormStepsService<any, any, any, any>,
  NsFormStepsModel<any, any, any>
> {
  NsIcon = NsIcon;

  constructor(service: NsFormStepsService<any, any, any, any>) {
    super(service);
  }
}
