import { Injectable } from '@angular/core';
import { NsComponentService } from '../../component/ns-component.service';
import { NsServiceProvider } from '../../ns-service-provider';
import { NsUserLogInInformationModel } from './ns-user-log-in-information.model';

@Injectable()
export class NsUserLogInInformationService
   extends NsComponentService<NsUserLogInInformationModel> {

   constructor(model: NsUserLogInInformationModel,
               private readonly _serviceProvider: NsServiceProvider
   ) {
      super(model);
   }

   onInit(): void {
      super.onInit();

      this.loadUserInformation();
   }

   private loadUserInformation() {
      this.subscribeTo(
         this._serviceProvider.authService.authenticationEvent$,
         {
            next: value => this.model.credentials = value.credentials
         }
      );
   }

   handleLoginClick() {
      this._serviceProvider.navService.toLogin();
   }

   handleLogOutClick() {
      this._serviceProvider.authService.logout();
   }
}
