import { Injectable } from '@angular/core';
import { NsFormService } from 'ns-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { CustomerEntity } from '../../data/customer.entity';
import { FormsInputBasicModel } from './forms-input-basic.model';

@Injectable()
export class FormsInputBasicService
   extends NsFormService<FormsInputBasicModel, CustomerEntity, AppServiceProvider, AppNavigationService> {

   constructor(model: FormsInputBasicModel, serviceProvider: AppServiceProvider) {
      super(model, serviceProvider);
   }

   onInit() {
      super.onInit();

      this.model.patchValue({
         lastName: 'Bob'
      });
   }

   patchValue() {
      this.model.patchValue({
         lastName: 'Merc'
      });
   }
}
