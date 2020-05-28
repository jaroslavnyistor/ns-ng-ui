import { Injectable } from '@angular/core';
import { NsRouterService } from '../../../utils/navigation/ns-router.service';
import { routeNoPermission } from './ns-page-no-permission.routes';

@Injectable({
   providedIn: 'root'
})
export class NsPageNoPermissionService {
   constructor(private _routerService: NsRouterService) {
   }

   async navigate() {
      await this._routerService.navigateByUrl(routeNoPermission);
   }
}
