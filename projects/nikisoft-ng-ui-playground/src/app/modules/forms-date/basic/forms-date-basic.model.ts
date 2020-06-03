import { Injectable } from '@angular/core';
import { NsFormControlDatePickerModel } from 'nikisoft-ng-ui';
import { NsFormModel } from 'nikisoft-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { FormsDateBasicEntity } from './forms-date-basic.entity';
import { newFormsDateBasicEntity } from './forms-date-basic.entity';

@Injectable()
export class FormsDateBasicModel extends NsFormModel<FormsDateBasicEntity, AppServiceProvider, AppNavigationService> {
  private _date: NsFormControlDatePickerModel<FormsDateBasicEntity>;

  get date(): NsFormControlDatePickerModel<FormsDateBasicEntity> {
    return this._date;
  }

  constructor(serviceProvider: AppServiceProvider) {
    super(serviceProvider, newFormsDateBasicEntity());

    this._date = this.addDate({
      key: 'date',
      label: 'Date'
    });
  }
}
