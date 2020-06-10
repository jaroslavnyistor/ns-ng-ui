import { Injectable } from '@angular/core';
import { NsFormControlDatePickerModel, NsFormModel } from 'nikisoft-ng-ui';
import { NsDate } from 'nikisoft-utils';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { FormsDateMinMaxEntity, newFormsDateMinMaxEntity } from './forms-date-min-max.entity';

@Injectable()
export class FormsDateMinMaxModel extends NsFormModel<FormsDateMinMaxEntity, AppServiceProvider, AppNavigationService> {
  private readonly _minDate: NsFormControlDatePickerModel<FormsDateMinMaxEntity>;
  private readonly _maxDate: NsFormControlDatePickerModel<FormsDateMinMaxEntity>;
  private readonly _date: NsFormControlDatePickerModel<FormsDateMinMaxEntity>;

  get minDate(): NsFormControlDatePickerModel<FormsDateMinMaxEntity> {
    return this._minDate;
  }

  get maxDate(): NsFormControlDatePickerModel<FormsDateMinMaxEntity> {
    return this._maxDate;
  }

  get date(): NsFormControlDatePickerModel<FormsDateMinMaxEntity> {
    return this._date;
  }

  constructor(serviceProvider: AppServiceProvider) {
    super(serviceProvider, newFormsDateMinMaxEntity());

    this._minDate = this.addDate({
      key: 'minDate',
      label: 'Mininum date allowed',
    });

    this._maxDate = this.addDate({
      key: 'maxDate',
      label: 'Mininum date allowed',
    });

    this._date = this.addDate({
      key: 'date',
      label: 'Date',
      isRequired: true,
    });
  }

  onInit() {
    super.onInit();

    this._date.setMinDate$(this._minDate.valueChanges$)
      .setMaxDate$(this._maxDate.valueChanges$);
  }
}
