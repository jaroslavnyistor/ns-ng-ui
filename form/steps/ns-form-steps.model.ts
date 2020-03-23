import { MatHorizontalStepper } from '@angular/material';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsFormModel } from '../ns-form.model';

export abstract class NsFormStepsModel<TEntity,
   TServiceProvider extends NsServiceProvider>
   extends NsFormModel<TEntity, TServiceProvider> {

   private _stepper: MatHorizontalStepper;
   private _stepsCount: number;
   private _lastStepIndex: number;

   get stepper(): MatHorizontalStepper {
      return this._stepper;
   }

   set stepper(value: MatHorizontalStepper) {
      this._stepper = value;
   }

   get stepsCount(): number {
      return this._stepsCount;
   }

   set stepsCount(value: number) {
      this._stepsCount = value;
      this._lastStepIndex = this._stepsCount - 1;
   }

   get isPreviousButtonVisible(): boolean {
      return this.stepper != null && this.stepper.selectedIndex > 0;
   }

   get isNextButtonVisible(): boolean {
      return this.stepper != null && this.stepper.selectedIndex < this._lastStepIndex;
   }

   protected constructor(entity: TEntity, serviceProvider: TServiceProvider) {
      super(entity, serviceProvider);
   }
}
