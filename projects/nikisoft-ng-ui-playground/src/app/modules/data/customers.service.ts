import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomerEntity } from './customer.entity';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private _data$: Observable<CustomerEntity[]>;

  constructor(private _httpClient: HttpClient) {}

  loadOnStartup() {
    return this._httpClient.get<CustomerEntity[]>(`assets/data/customers.json`)
      .pipe(
        tap(value => this._data$ = of(value))
      )
      .toPromise();
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
  multi: true,
};
