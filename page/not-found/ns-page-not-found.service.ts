import { Injectable } from '@angular/core';
import { NsRouterService } from '../../../utils/navigation/ns-router.service';
import { routeNotFound } from './ns-page-not-found.routes';

@Injectable({
   providedIn: 'root'
})
export class NsPageNotFoundService {
   constructor(private _routerService: NsRouterService) {
   }

   navigate() {
      this._routerService.navigateByUrl(routeNotFound);
   }
}
