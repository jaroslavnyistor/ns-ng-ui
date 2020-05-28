import { Injectable } from '@angular/core';
import { NsRouterService, routeNoPermission } from 'ns-js-utils';

@Injectable({
  providedIn: 'root',
})
export class NsPageNoPermissionService {
  constructor(private _routerService: NsRouterService) {}

  async navigate() {
    await this._routerService.navigateByUrl(routeNoPermission);
  }
}
