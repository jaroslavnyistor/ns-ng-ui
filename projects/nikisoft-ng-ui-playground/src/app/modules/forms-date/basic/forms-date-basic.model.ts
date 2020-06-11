import { Injectable } from '@angular/core';
import { NsFormControlDatePickerModel } from '../../../../../../nikisoft-ng-ui/src/lib/form/controls/date/ns-form-control-date-picker.model';
import { NsFormModel } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.model';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { FormsDateBasicEntity } from './forms-date-basic.entity';
import { newFormsDateBasicEntity } from './forms-date-basic.entity';

@Injectable()
export class FormsDateBasicModel extends NsFormModel<FormsDateBasicEntity, AppServiceProvider, AppNavigationService> {
  private readonly _date: NsFormControlDatePickerModel<FormsDateBasicEntity>;

  get date(): NsFormControlDatePickerModel<FormsDateBasicEntity> {
    return this._date;
  }

  constructor(serviceProvider: AppServiceProvider) {
    super(serviceProvider, newFormsDateBasicEntity());

    this._date = this.addDate({
      key: 'date',
      label: 'Date',
      isRequired: true,
    });
  }
}
