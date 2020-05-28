import { Injectable } from '@angular/core';
import { NsNavigationService } from 'ns-js-utils';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsServiceProviderComponentService } from '../../service-provider/ns-service-provider-component.service';
import { NsUserLogInInformationModel } from './ns-user-log-in-information.model';

@Injectable()
export class NsUserLogInInformationService
   extends NsServiceProviderComponentService<NsUserLogInInformationModel, NsServiceProvider<NsNavigationService>,
      NsNavigationService> {

   constructor(model: NsUserLogInInformationModel, serviceProvider: NsServiceProvider<NsNavigationService>) {
      super(model, serviceProvider);
   }

   handleLoginClick() {
      this.navService.toLogin();
   }

   handleLogOutClick() {
      this.authService.logout();
   }
}
