import { NsFormControlArrayItemModel, NsFormControlInputModel } from "ns-ng-ui";
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomerEntity, newCustomer } from '../../data/customer.entity';

export class CustomersArrayItemModel
   extends NsFormControlArrayItemModel<CustomerEntity, AppServiceProvider, AppNavigationService> {
   private readonly _firstName: NsFormControlInputModel<CustomerEntity>;
   private readonly _lastName: NsFormControlInputModel<CustomerEntity>;

   get firstName(): NsFormControlInputModel<CustomerEntity> {
      return this._firstName;
   }

   get lastName(): NsFormControlInputModel<CustomerEntity> {
      return this._lastName;
   }

   constructor(serviceProvider: AppServiceProvider) {
      super(serviceProvider, newCustomer());

      this._firstName = this.addText({
         key: 'firstName',
         label: 'First name',
         isRequired: true
      });

      this._lastName = this.addText({
         key: 'lastName',
         label: 'Last name',
         isRequired: true
      });
   }
}
