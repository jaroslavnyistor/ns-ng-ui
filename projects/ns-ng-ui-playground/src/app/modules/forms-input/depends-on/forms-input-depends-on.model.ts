import { Injectable } from '@angular/core';
import { NsFormControlInputModel, NsFormModel } from 'ns-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomerEntity, newCustomer } from '../../data/customer.entity';

@Injectable()
export class FormsInputDependsOnModel extends NsFormModel<CustomerEntity, AppServiceProvider, AppNavigationService> {
  private readonly _userName: NsFormControlInputModel<CustomerEntity>;
  private readonly _password: NsFormControlInputModel<CustomerEntity>;

  get userName(): NsFormControlInputModel<CustomerEntity> {
    return this._userName;
  }

  get password(): NsFormControlInputModel<CustomerEntity> {
    return this._password;
  }

  constructor(serviceProvider: AppServiceProvider) {
    super(serviceProvider, newCustomer());

    this._userName = this.addText({
      key: 'userName',
      label: 'User name',
      isRequired: true,
    });

    this._password = this.addPassword({
      key: 'password',
      label: 'Password',
      isRequired: true,
      dependsOn: [this._userName],
    });
  }
}
