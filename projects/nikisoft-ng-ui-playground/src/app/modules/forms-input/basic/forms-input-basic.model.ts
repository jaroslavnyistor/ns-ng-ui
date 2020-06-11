import { Injectable } from '@angular/core';
import { NsFormControlInputModel } from '../../../../../../nikisoft-ng-ui/src/lib/form/controls/input/ns-form-control-input.model';
import { NsFormModel } from '../../../../../../nikisoft-ng-ui/src/lib/form/ns-form.model';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomerEntity, newCustomer } from '../../data/customer.entity';

@Injectable()
export class FormsInputBasicModel extends NsFormModel<CustomerEntity, AppServiceProvider, AppNavigationService> {
  private readonly _firstName: NsFormControlInputModel<CustomerEntity>;
  private readonly _lastName: NsFormControlInputModel<CustomerEntity>;
  private readonly _password: NsFormControlInputModel<CustomerEntity>;
  private readonly _email: NsFormControlInputModel<CustomerEntity>;
  private readonly _website: NsFormControlInputModel<CustomerEntity>;

  get firstName(): NsFormControlInputModel<CustomerEntity> {
    return this._firstName;
  }

  get lastName(): NsFormControlInputModel<CustomerEntity> {
    return this._lastName;
  }

  get password(): NsFormControlInputModel<CustomerEntity> {
    return this._password;
  }

  get email(): NsFormControlInputModel<CustomerEntity> {
    return this._email;
  }

  get website(): NsFormControlInputModel<CustomerEntity> {
    return this._website;
  }

  constructor(serviceProvider: AppServiceProvider) {
    super(serviceProvider, newCustomer());

    this._firstName = this.addText({
      key: 'firstName',
      label: 'First name',
      hint: 'First name must have at minimum of 8 characters',
      isRequired: true,
      minLength: 8,
      autofocus: true,
    });

    this._lastName = this.addText({
      key: 'lastName',
      label: 'Last name',
      hint: 'First name must have at maximum of 8 characters',
      isRequired: true,
      maxLength: 8,
    });

    this._password = this.addPassword({
      key: 'password',
      label: 'Password',
      isRequired: true,
    });

    this._email = this.addEmail({
      key: 'email',
      label: 'E-mail',
      isRequired: true,
    });

    this._website = this.addUrl({
      key: 'website',
      label: 'Web site',
    });
  }
}
