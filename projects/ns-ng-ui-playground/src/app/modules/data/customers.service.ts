import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomerEntity } from './customer.entity';

@Injectable({
   providedIn: 'root'
})
export class CustomersService {
   private _data$: Observable<CustomerEntity[]>;

   constructor(private _httpClient: HttpClient) {
   }

   loadOnStartup() {
      this._httpClient.get<CustomerEntity[]>(`assets/data/customers.json`)
         .subscribe(
            {
               next: value => this._data$ = of(value)
            }
         );
   }

   load(): Observable<CustomerEntity[]> {
      return this._data$;
   }
}

export function customersServiceAppInitializer(service: CustomersService) {
   return () => service.loadOnStartup();
}

export const customersServiceDataProvider: Provider = {
   provide: APP_INITIALIZER,
   useFactory: customersServiceAppInitializer,
   deps: [CustomersService],
   multi: true
};
