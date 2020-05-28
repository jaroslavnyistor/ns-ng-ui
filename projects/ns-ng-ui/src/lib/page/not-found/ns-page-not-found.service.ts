import { Injectable } from '@angular/core';
import { NsRouterService, routeNotFound } from 'ns-js-utils';

@Injectable({
  providedIn: 'root',
})
export class NsPageNotFoundService {
  constructor(private _routerService: NsRouterService) {}

  navigate() {
    this._routerService.navigateByUrl(routeNotFound);
  }
}
