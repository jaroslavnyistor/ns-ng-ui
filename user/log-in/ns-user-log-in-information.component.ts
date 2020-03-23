import { Component, Input } from '@angular/core';
import { NsComponentBase } from '../../component/ns-component.base';
import { NsIcon } from '../../icon/ns-icon.enum';
import { NsUserLogInInformationModel } from './ns-user-log-in-information.model';
import { NsUserLogInInformationService } from './ns-user-log-in-information.service';

@Component({
   selector: 'ns-user-log-in-information',
   templateUrl: './ns-user-log-in-information.component.html',
   styleUrls: ['./ns-user-log-in-information.component.sass'],
   providers: [
      NsUserLogInInformationService,
      NsUserLogInInformationModel
   ]
})
export class NsUserLogInInformationComponent
   extends NsComponentBase<NsUserLogInInformationService, NsUserLogInInformationModel> {

   get defaultIcon(): NsIcon {
      return NsIcon.Person;
   }

   @Input() displayLanguagesPicker = true;

   constructor(service: NsUserLogInInformationService) {
      super(service);
   }
}
