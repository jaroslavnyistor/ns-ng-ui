import { Component, ContentChildren, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { NsComponentBase } from '../../component/ns-component.base';
import { NsFormStepDirective } from './ns-form-step.directive';
import { NsFormStepsModel } from './ns-form-steps.model';
import { NsFormStepsService } from './ns-form-steps.service';

@Component({
  selector: 'ns-form-steps',
  templateUrl: './ns-form-steps.component.html',
  styleUrls: ['./ns-form-steps.component.sass'],
})
export class NsFormStepsComponent
  extends NsComponentBase<NsFormStepsService<any, any, any, any>, NsFormStepsModel<any, any, any>>
  implements OnInit {
  private _steps: QueryList<NsFormStepDirective>;
  private _stepper: MatHorizontalStepper;

  get steps(): QueryList<NsFormStepDirective> {
    return this._steps;
  }

  @ContentChildren(NsFormStepDirective, { descendants: false })
  set steps(value: QueryList<NsFormStepDirective>) {
    this._steps = value;
    this.model.stepsCount = this._steps.length;
  }

  @ViewChild('stepper', { static: true })
  set stepper(value: MatHorizontalStepper) {
    this._stepper = value;

    if (this.service != null) {
      this.model.stepper = value;
    }
  }

  constructor(service: NsFormStepsService<any, any, any, any>) {
    super(service);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.model.stepper = this._stepper;
  }
}
