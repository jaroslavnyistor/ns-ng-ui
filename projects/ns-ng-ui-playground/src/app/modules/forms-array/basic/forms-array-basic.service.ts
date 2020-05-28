import { Injectable } from '@angular/core';
import { NsFormService } from 'ns-ng-ui';
import { AppNavigationService } from '../../../service-provider/app-navigation.service';
import { AppServiceProvider } from '../../../service-provider/app-service-provider';
import { FormsArrayBasicEntity } from './forms-array-basic.entity';
import { FormsArrayBasicModel } from './forms-array-basic.model';

@Injectable()
export class FormsArrayBasicService
   extends NsFormService<FormsArrayBasicModel, FormsArrayBasicEntity, AppServiceProvider, AppNavigationService> {

   constructor(model: FormsArrayBasicModel, serviceProvider: AppServiceProvider) {
      super(model, serviceProvider);
   }
}
