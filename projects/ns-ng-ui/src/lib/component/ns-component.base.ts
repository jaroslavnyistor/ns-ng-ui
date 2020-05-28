import { OnDestroy, OnInit } from '@angular/core';
import { NsSubscriptionBase } from 'ns-js-utils';
import { NsComponentModel } from './ns-component.model';
import { NsComponentService } from './ns-component.service';

export abstract class NsComponentBase<TService extends NsComponentService<TModel>,
   TModel extends NsComponentModel>
   extends NsSubscriptionBase
   implements OnInit, OnDestroy {

   private readonly _service: TService;

   protected constructor(service: TService) {
      super();

      this._service = service;
   }

   get service(): TService {
      return this._service;
   }

   get model(): TModel {
      return this.service.model;
   }

   ngOnInit(): void {
      super.ngOnInit();

      if (!this._service.isInitialized) {
         this._service.onInit();
      }
   }

   ngOnDestroy(): void {
      super.ngOnDestroy();

      if (!this._service.isDestroyed) {
         this._service.onDestroy();
      }
   }
}
