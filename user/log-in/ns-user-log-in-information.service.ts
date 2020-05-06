import { Injectable } from '@angular/core';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsServiceProviderComponentService } from '../../ns-service-provider-component.service';
import { NsUserLogInInformationModel } from './ns-user-log-in-information.model';

@Injectable()
export class NsUserLogInInformationService
   extends NsServiceProviderComponentService<NsUserLogInInformationModel, NsServiceProvider, NsNavigationService> {

   constructor(model: NsUserLogInInformationModel, serviceProvider: NsServiceProvider) {
      super(model, serviceProvider);
   }

   handleLoginClick() {
      this.navService.toLogin();
   }

   handleLogOutClick() {
      this.authService.logout();
   }
}
