import { Component } from '@angular/core';
import { NsComponentBase } from '../../component/ns-component.base';
import { NsPageEditDiConfigurator } from '../edit/ns-page-edit.di-configurator';
import { LoginModel } from './login.model';
import { LoginService } from './login.service';

@Component({
   selector: 'login',
   templateUrl: './login.component.html',
   styles: [],
   providers: [
      NsPageEditDiConfigurator.provideService(LoginService, LoginModel)
   ]
})
export class LoginComponent extends NsComponentBase<LoginService, LoginModel> {

   constructor(service: LoginService) {
      super(service);
   }
}
